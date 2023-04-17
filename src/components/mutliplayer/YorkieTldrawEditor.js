import { Tldraw, useFileSystem } from "@tldraw/tldraw";
import { useMultiplayerState } from "./hooks/useMultiplayerState";
import CustomCursor from '../custom/CustomCursor';

/*
This demo shows how to integrate TLDraw with a multiplayer room
via Yorkie. You could use any other service instead—the important
part is to get data from the Tldraw app when its document changes 
and update it when the server's synchronized document changes.

Warning: Keeping images enabled for multiplayer applications
without providing a storage bucket based solution will cause
massive base64 string to be written to the multiplayer storage.
It's recommended to use a storage bucket based solution, such as
Amazon AWS S3. Further demo will be implemented.

이 데모에서는 TLDraw를 멀티 플레이어 룸에 통합하는 방법을 보여줍니다.
요키 경유로. 대신 다른 서비스를 사용할 수 있습니다 - 중요
부분적으로는 문서가 변경되었을 때 Tldraw 애플리케이션에서 데이터를 가져오는 것입니다. 
서버의 동기화된 문서가 변경되었을 때 업데이트합니다.

경고: 멀티플레이어 애플리케이션의 이미지를 활성화해 두다
스토리지 버킷 기반 솔루션을 제공하지 않으면
massive base64 문자열을 멀티플레이어 스토리지에 써야 합니다.
다음과 같은 스토리지 버킷 기반 솔루션을 사용하는 것이 좋습니다.
Amazon AWS S3. 추가 데모가 실시됩니다.

*/

function Editor({ roomId, userName }) {
  const fileSystemEvents = useFileSystem();
  const { ...events } = useMultiplayerState(roomId, userName);
  const component = { Cursor: CustomCursor };

  return (
    <div>
      <Tldraw
        components={component}
        autofocus
        disableAssets={true}
        showPages={false}
        {...fileSystemEvents}
        {...events}
      />
    </div>
  );
}

export default function YorkieTldrawEditor() {
  return (
    <div className="tldraw">
      <Editor
        roomId={
          sessionStorage.getItem("room") === null
            ? "room1"
            : sessionStorage.getItem("room")
        }
        userName={
          sessionStorage.getItem("userName") === null
            ? "Anonymous"
            : sessionStorage.getItem("userName")
        }
      />
    </div>
  );
}
