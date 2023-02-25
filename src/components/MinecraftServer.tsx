import { MinecraftServer } from "../hooks/useMinecraftServer";
import styled from 'styled-components';

const MinecraftServerRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const MinecraftServerBigRow = styled(MinecraftServerRow)`
    border: solid 1px red;
    background-color: grey;
    justify-content: space-between;
`;

const MinecraftServerColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25%;
`;

const StyledImage = styled.img`
    display: flex;
    flex-direction: left;
    width: 100px;
    height: 100px;
`;

export interface MinecraftServerProps {
    server: MinecraftServer
}

function MinecraftServerItem({ server } : MinecraftServerProps) {
    return (
    <MinecraftServerBigRow>
        <StyledImage src={`${server.favicon}`}/>
        <MinecraftServerColumn>
            <MinecraftServerRow>
                {server.address}:{server.port}
            </MinecraftServerRow>
            <MinecraftServerRow>
                {server.description}
            </MinecraftServerRow>
        </MinecraftServerColumn>
        <MinecraftServerColumn>
            <MinecraftServerRow>
                {server.players?.max}
            </MinecraftServerRow>
            <MinecraftServerRow>
                {server.players?.online}
            </MinecraftServerRow>
            <MinecraftServerRow>
                {server.players?.sample}
            </MinecraftServerRow>
        </MinecraftServerColumn>
        <MinecraftServerColumn>
            <MinecraftServerRow>
                {server.version?.name}
            </MinecraftServerRow>
            <MinecraftServerRow>
                {server.version?.protocol}
            </MinecraftServerRow>
        </MinecraftServerColumn>
    </MinecraftServerBigRow>);
}

export default MinecraftServerItem;