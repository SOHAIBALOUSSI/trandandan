import { ChatMessage } from "types/types";
import { displayToast } from "@/utils/display-toast";

let ws: WebSocket | null = null;

export function startChatListener() {
  if (ws && ws.readyState === WebSocket.OPEN) return;

  ws = new WebSocket("ws://localhost:3004");

  ws.onopen = () => {
    console.log("Chat Websocket connection established.");
  };

  ws.onmessage = (event: MessageEvent) => {
    const chatDiv = document.getElementById("chat-messages") as HTMLDivElement;
    if (!chatDiv) return;

    try {
      const message: ChatMessage = JSON.parse(event.data);
      console.log("Received chat message:", message);
    } catch (error) {
      displayToast(
        "The club’s lights are out at the moment. Try again shortly.",
        "error"
      );
    }
  };

  ws.onerror = () => {
    displayToast(
      "The club’s lights are out at the moment. Try again shortly.",
      "error"
    );
  };

  ws.onclose = () => {
    console.log("Chat Websocket connection closed.");
    ws = null;
  };
}
