
import { 
  Box,
  Heading,
  Input,
  Button,
  Grid,
  Card,
  CardBody,
  Tag,
  Text,
  GridItem,
  Divider
} from '@chakra-ui/react'
import Ilustration from './components/Ilustration'
import {useState, useEffect} from 'react'
import axios from "axios";


interface HeroData {
  hero_id: number;
  hero_name: string;
  hero_role: string;
  hero_specially: string
}

function App() {
  const [dataHero, setData] = useState<HeroData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [keyword, setKeyword] = useState<string>("");
  const [filteredHero, setFilteredHero] = useState<HeroData[]>([]);


  useEffect(() => {
    axios
    .get('https://api.dazelpro.com/mobile-legends/hero')
    .then((response) => {
      setData(response.data.hero)
      setLoading(false);
      setFilteredHero(response.data.hero);
    })
    .catch((error) => {
      console.log(error);
    })
  },[])

  const handleSearchHero = () => {
    const keywordLower = keyword.toLowerCase();
    const filteringHero = dataHero.filter((hero: HeroData) => {
      return hero.hero_name.toLowerCase().includes(keywordLower);
    })

    setFilteredHero(filteringHero)
  }

  if (loading) {
    return <span className="loading loading-dots loading-lg "></span>;
  }

  return (
    <Box background={'indigo'} padding={'20px'} display={'flex'} justifyContent={'center'} w={'full'} height={'full'} color={'white'}>
      <Box>
        <Heading textAlign={'center'} my={'30px'}>Mobile Legends Heroes</Heading>
        <Ilustration/>
        <Box display={'flex'} gap={'10px'}>
          <Input 
            variant='filled' 
            placeholder='Find Heros'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchHero();
              }
            }}
            />
          <Button colorScheme='green' onClick={handleSearchHero}>Search</Button>
        </Box>
        <Box my={'20px'}>
            <Grid templateColumns={'repeat(4, 1fr)'} gap={6} alignItems={'center'}>
              {filteredHero.length === 0? (
                <Box>
                  <Heading>Data Not Found</Heading>
                </Box>
              ): (
                filteredHero?.map((heros) =>(
                  <GridItem key={heros.hero_id} w='100%' h='100%' colSpan={{base:8, sm: 2, md: 2, lg:1}}>
                    <Card maxWidth={'sm'} background={'purple.500'} color={'white'}>
                      <CardBody gap={'5px'}>
                        <Box mb={'10px'}>
                          <Heading>{heros.hero_name}</Heading>
                        </Box>
                        <Box mb={'10px'}>
                          <Text>
                            Role :
                          </Text>
                          <Tag key={heros.hero_role} colorScheme='green'>{heros.hero_role}</Tag>
                        </Box>
                        <Box mb={'10px'}>
                          <Text>
                            Specialy :
                          </Text>
                          <Tag colorScheme='orange'>{heros.hero_specially}</Tag>
                        </Box>
                      </CardBody>
                    </Card>
                  </GridItem>
                ))
              )}
            </Grid>
        </Box>
        <Divider/>
        <Box my={'80px'} textAlign={'center'}>Powered By Marihots</Box>
      </Box>
    </Box>
  )
}

export default App
