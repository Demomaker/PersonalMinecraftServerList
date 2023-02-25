const useApi = () => {
    const ping = async (address: string, port: number, serverId: string, callback: any) => {
        const response = {
            body: undefined
        }/*await fetch(`https://minecraft-api.com/api/ping/${address}/${port}/json`, {
            mode: 'cors'
        });*/
        callback(serverId, response);
    }

    return {
        ping
    };
}

export default useApi;