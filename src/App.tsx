import { useState, useCallback, useRef } from 'react'
import './App.css'
import useApi from './services/useApi';
import MinecraftServerItem from './components/MinecraftServer';
import useMinecraftServer, { MinecraftServer } from './hooks/useMinecraftServer';
import styled from 'styled-components';
import $ from 'jquery';

const ServerList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledServerRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: lightgrey;
`;

const StyledInputRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const DEFAULT_MINECRAFT_PORT = 25565
const DEFAULT_MINECRAFT_SERVER = 'mc.hypixel.net'
function download(filename : string, text : string) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function App() {
  
  const {
    initialList,
    replaceServer,
    generateServerId
  } = useMinecraftServer();
  const [serverList, setServerList] = useState<MinecraftServer[]>(initialList)
  const api = useApi();
  const addressInput = useRef<HTMLInputElement>(null);
  const portInput = useRef<HTMLInputElement>(null);
  const fileImportInput = useRef<HTMLInputElement>(null);

  const callback = useCallback((serverId: string, result: any) => {
    const server : MinecraftServer = {
      serverId: serverId,
      ...result.body
    }
    const currentList = serverList.slice();
    setServerList(replaceServer(currentList, serverId, server))
  }, [setServerList, serverList]);

  const pingServers = useCallback(() => {
    serverList.forEach(server => {
      api.ping(server.address, server.port, server.serverId, callback);
    });
  }, [serverList]);

  const importServers = useCallback(() => {
    const file = fileImportInput.current?.files![0];
    const reader = new FileReader();
    reader.addEventListener("load", function() {
      const fileText = reader.result;
      if(typeof fileText === 'string') {
        const newServersToAdd = JSON.parse(fileText);
        const currentServerList = serverList.slice();
        newServersToAdd.forEach((server : MinecraftServer) => {
          currentServerList.push(server);
        });
        setServerList(currentServerList);
      }
    }, false)
    if (file) {
      reader.readAsText(file);
    }
  }, [serverList, setServerList]);

  const exportServers = useCallback(() => {
    const text = JSON.stringify(serverList);
    download('PersonalMinecraftServerListExport.json', text);
  }, [serverList]);

  const addServer = useCallback(() => {
    const address = parseAddress();
    const port = parsePort();
    const server : MinecraftServer = {
      serverId : generateServerId(),
      address : address,
      port : port,
    }
    const currentList = serverList.slice();
    currentList.push(server);
    setServerList(currentList);
  }, [serverList, setServerList]);

  const removeServer = useCallback((serverIndex : number) => {
    setServerList(serverList.filter((server, index) => index !== serverIndex))
  }, [setServerList, serverList]);

  const parseAddress = useCallback(() => {
    const text = addressInput.current?.value;
    return text ?? DEFAULT_MINECRAFT_SERVER;
  }, [addressInput.current]);

  const parsePort = useCallback(() => {
    const text = portInput.current?.value;
    const parsed = parseInt(text ?? DEFAULT_MINECRAFT_PORT.toString());
    return isNaN(parsed) ? DEFAULT_MINECRAFT_PORT : parsed;
  }, [portInput.current]);

  return (
    <div className="App">
      <>
        <h1>Personal Minecraft Server List</h1>
        <StyledInputRow>
        <input ref={addressInput} type='text' placeholder='Address' /><input ref={portInput} type='text' placeholder='Port' /><button onClick={addServer}>Add Server</button>
        <input ref={fileImportInput} type='file' onChange={importServers}/>
        <button onClick={exportServers}>Export</button>
        </StyledInputRow>
        <ServerList>
          {serverList.map((server, index) => {return <StyledServerRow key={index}><MinecraftServerItem server={server} /><button onClick={() => {removeServer(index)}}>Remove</button></StyledServerRow>})}
        </ServerList>
      </>
    </div>
  )
}

export default App
