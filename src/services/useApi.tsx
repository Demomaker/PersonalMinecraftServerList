import $ from 'jquery';
const useApi = () => {
    const ping = async (address: string, port: number, serverId: string, callback: any) => {
        const URL = `https://minecraft-api.com/api/ping/${address}/${port}/json`;
        const settings = {
            cache: false,
            dataType: 'json',
            async: false,
            crossDomain: true,
            contentType: "application/json",
            url: URL,
            method: 'GET',
            timeout: 5000,
            //@ts-ignore
            success: function(response) {
                console.log(response);
                callback(serverId, response);
            },
            
            //@ts-ignore
            error: function(response) 
            {
                console.log('ERROR : ', response);
            }

        }
        //@ts-ignore
        $.ajax(settings)
    }

    return {
        ping
    };
}

export default useApi;