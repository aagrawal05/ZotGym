#!/usr/bin/env python
import asyncio
import websockets
import uuid

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
                recieve_uid, content, time = payload
                # TODO: SQL store
                send_uid = sid_to_uid[socket_id] 
                recieve_sid = ''
                for key, value in sid_to_uid.items():
                    if (value == recieve_uid):
                        recieve_sid = key
                        break
                if (recieve_sid):
                    server_message = f"R|{send_uid}|{content}"
                    await connected_clients[recieve_sid].send(server_message)
                    print(server_message)
                print(message)

    except websockets.exceptions.ConnectionClosed as e:
        print(f"Connection closed with {socket_id}: {e}")
    finally:
        on_disconnect(socket_id)

async def main():
    async with websockets.serve(handler, "169.234.106.119", 8765):
        print("Server started at ws://169.234.106.119:8765")
        await asyncio.Future()

asyncio.run(main())
