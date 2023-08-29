import { Tldraw, TldrawApp, useFileSystem } from "@tldraw/tldraw";
import { useUsers } from "y-presence";
import { useMultiplayerState } from "./hooks/useMultiplayerState";
import "./board.css";
import { awareness, roomID } from "./store";
import Recording from "../Video/Recording";
import { createRef, useEffect, useRef } from "react";

function Editor({ roomId }: { roomId: string }) {
  const fileSystemEvents = useFileSystem();
  const { onMount, ...events } = useMultiplayerState(roomId);

  const ref = useRef()

  return (
    <Tldraw
      // @ts-ignore
      ref={ref}
      autofocus
      disableAssets
      showPages={false}
      onMount={onMount}
      {...fileSystemEvents}
      {...events}
    />
  );
}

function Info() {
  const users = useUsers(awareness);

  return (
    <div className="absolute p-md">
      <div className="flex space-between">
        <span>members: {users.size}</span>
        <div><Recording /></div>
      </div>
    </div>
  );
}

export default function Board() {
  return (
    <div className="tldraw">
      <Info />
      <Editor roomId={roomID} />
    </div>
  );
}
