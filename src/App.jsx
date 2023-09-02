import { useContext } from 'react';
import './App.css'
import { State, WebsocketContext } from './components/websocket/WebSocketContext';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Room from './components/game/room/Room';
import Join from './components/join/join/Join';
import useWebSocket from './components/websocket/WebSocketHook';
import { useDispatch } from 'react-redux';
import { setUserName, setUserUUID } from './store/userSlice';
import WebSocketStatusPage from './components/websocket/WebSocketStatusPage';
import { setCardDeckPresets } from './store/roomSlice';

const router = createBrowserRouter([
  {
    path: ":id",
    Component: Room
  },
  {
    path: "join/:id?",
    Component: Join
  },
  {
    path: "*",
    element: <><Navigate to={"join"} replace/></>
  }
])

function App() {
  const {status} = useContext(WebsocketContext);
  const dispatch = useDispatch();

  useWebSocket("own_player_data", (data) => {
    dispatch(setUserUUID(data.player.uuid))
    dispatch(setUserName(data.player.name))
  })
  useWebSocket("card_deck_presets", data => {
    console.log(data.presets);
    dispatch(setCardDeckPresets(data.presets));
  })

  return (
    <div id="app">
      {status == State.CONNECTED?
        <RouterProvider router={router} />:
        <WebSocketStatusPage />
      }
    </div>
  )
}

export default App
