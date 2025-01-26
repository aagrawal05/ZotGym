import styles from "@/styles/chatbubble.module.css"

export default function ChatBubble(props) {
    const { isSender, message } = props;
    
    return (
        <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-4`}>
            <div 
                className={`max-w-xs p-4 rounded-lg text-white ${isSender ? 'bg-blue-500' : 'bg-gray-300'}`}
                style={{ wordWrap: 'break-word' }}
            >
                {message}
            </div>
        </div>
    )
}

