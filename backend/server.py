#!/usr/bin/env python
import asyncio
import websockets
import uuid
import requests

connected_clients = {}
sid_to_uid = {}

def on_connect(socket_id, websocket):
    print(f"New connection: {socket_id}.")
    connected_clients[socket_id] = websocket
    sid_to_uid[socket_id] = None

def on_disconnect(socket_id):
    print(f"Connection closed: {socket_id}.")
    connected_clients.pop(socket_id, None)
    sid_to_uid.pop(socket_id, None)

async def handler(websocket):
    socket_id = str(uuid.uuid4())
    on_connect(socket_id, websocket)
    try:
        async for message in websocket:
            print(sid_to_uid)
            action, *payload = message.split('|')
            print(payload)
            if (action == "I"):
                sid_to_uid[socket_id] = payload[0]
            elif (action == "S"):
                receive_uid, content, time = payload
                send_uid = sid_to_uid[socket_id] 
                message_data = {
                    "message": content,
                    "time": time
                }
                url = f"http://127.0.0.1:5000/messages/{send_uid}/{receive_uid}"
                print(url, message_data)
                response = requests.post(url, json=message_data)
                receive_sid = ''
                for key, value in sid_to_uid.items():
                    if (value == receive_uid):
                        receive_sid = key
                        break
                if (receive_sid):
                    server_message = f"R|{send_uid}|{content}"
                    await connected_clients[receive_sid].send(server_message)
                    print(server_message)
                print(message)

    except websockets.exceptions.ConnectionClosed as e:
        print(f"Connection closed with {socket_id}: {e}")
    finally:
        on_disconnect(socket_id)

async def main():
    async with websockets.serve(handler, "localhost", 8765):
        print("Server started at ws://localhost:8765")
        await asyncio.Future()

asyncio.run(main())
