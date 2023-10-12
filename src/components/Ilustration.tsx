import { Player } from "@lottiefiles/react-lottie-player"
import { Box } from '@chakra-ui/react'
 
export default function Ilustration() {
  return (
    <Box my={'30px'}>
        <Player
        autoplay
        loop
        src="https://assets-v2.lottiefiles.com/a/7e8213a4-1182-11ee-a96f-cb8fa403e028/WYpWcexPuU.json"
        style={{ height: '300px', width: '300px' }}>
        </Player>
    </Box>
  )
}
