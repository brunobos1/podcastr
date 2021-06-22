import { createContext, useState, ReactNode, useContext } from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    isActivePlayer: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    playNext: () => void;
    playPrevious: () => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    toggleActivePlayer: () => void;
    setPlayingState: (state: boolean) => void;
    clearPlayerState: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
}

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps){
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShunffling] = useState(false);
    const [isActivePlayer, setIsActivePlayer] = useState(false);
    const [isModoBlack, setIsModoBlack] = useState(false);
  
    function play(episode){
      setEpisodeList([episode]);
      setCurrentEpisodeIndex(0);
      setIsPlaying(true);
    }

    function playList(list: Episode[], index: number){
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }
  
    function togglePlay(){
      setIsPlaying(!isPlaying);
    }

    function toggleLoop(){
        setIsLooping(!isLooping);
    }

    function toggleShuffle(){
        setIsShunffling(!isShuffling);
    }
    
    function setPlayingState(state: boolean) {
      setIsPlaying(state);
    }

    function clearPlayerState() {
        setEpisodeList ([]);
        setCurrentEpisodeIndex(0);
    }

    function toggleActivePlayer(){
        setIsActivePlayer(!isActivePlayer)
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext =  isShuffling || currentEpisodeIndex + 1 < episodeList.length;

     // tocar proximo
    function playNext(){
        if(isShuffling){
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
            setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        }else if(hasNext){
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    }

    // tocar anterior
    function playPrevious(){
        if (hasPrevious){
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }
    }
  
    return (
        <PlayerContext.Provider 
            value={{
                episodeList, 
                currentEpisodeIndex, 
                play, 
                isPlaying, 
                isLooping,
                isShuffling,
                isActivePlayer,
                toggleShuffle,
                togglePlay,
                toggleLoop,
                toggleActivePlayer,
                setPlayingState,
                playList,
                playNext,
                playPrevious,
                hasNext,
                hasPrevious,
                clearPlayerState
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext);
}