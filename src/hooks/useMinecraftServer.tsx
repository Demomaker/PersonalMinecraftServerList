import { useMemo, useCallback } from "react"
import { v4 } from 'uuid'

export interface MinecraftVersion {
    name: string,
    protocol: number
}
  
export interface MinecraftPlayerCount {
    max: number,
    online: number,
    sample: any,
}

export interface MinecraftServer {
    serverId: string,
    version?: MinecraftVersion,
    players?: MinecraftPlayerCount,
    address: string,
    port: number,
    description?: string,
    favicon?: string
}

const useMinecraftServer = () => {
    const getServerIndexById = useCallback((serverList: MinecraftServer[], serverId: string) => {
        return serverList.findIndex(server => server.serverId === serverId);
    }, []);

    const replaceServer = useCallback((serverList: MinecraftServer[], serverId: string, newServer: MinecraftServer) => {
        let newServerList = serverList.slice();
        const index = getServerIndexById(serverList, serverId);
        const oldServer = newServerList[index];
        const together : MinecraftServer = {
            serverId: serverId,
            address: oldServer.address,
            port: oldServer.port,
            version: newServer.version,
            players: newServer.players,
            description: newServer.description,
            favicon: newServer.favicon,
        }
        newServerList[index] = together;
        return newServerList;
    }, []);

    const generateServerId = () => {
        return v4();
    }

    const initialList = useMemo(() : MinecraftServer[] => {
        return [{
            serverId: generateServerId(),
            address: 'mc.hypixel.net',
            port: 25565,
            description: 'WWWWWWWWWWWW',
            version: {
                name: '1.8',
                protocol: 300
            },
            players: {
                max: 20000,
                online: 400,
                sample: 'lol'
            }
        }]
    }, []);

    return {
        generateServerId,
        initialList,
        replaceServer,
    }
}

export default useMinecraftServer;