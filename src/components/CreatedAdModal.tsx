import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Input } from './Form/Input';
import { GameController,Check,CaretDown,CaretUp } from 'phosphor-react';
import { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';

export function CreateAdModal(){

    const [games,setGames ]= useState<Game[]>([])
    const [weekDays,setWeekDays] = useState<string[]>([])
    const [useVoiceChannel,setUseVoiceChannel] = useState<boolean>(false)

    interface Game{
      id:string;
      title:string;
    }
  
    useEffect(()=>{
      axios('http://localhost:3000/games').then(response =>{
        setGames(response.data);
      })
    },[])

    async function handleCreatedAd(event:FormEvent){
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement)
      const data = Object.fromEntries(formData)
      try{
        await axios.post(`http://localhost:3000/games/${data.game}/ads`,{
          name : data.name,
          yearsPlaying : Number(data.yearsPlaying),
          discord: data.discord,
          weekDays: weekDays.map(Number),
          hourStart: data.hourStart,
          hourEnd:data.hourEnd,
          useVoiceChannel:useVoiceChannel
        })
        alert('Anuncio criado com sucesso!')
      }catch(err){
        console.log(err)
        alert('Erro ao criar o aúncio')
      }

    }

    return(
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
              <form onSubmit={handleCreatedAd} className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="game" className="font-semibold">Qual o game?</label>
                  <Select.Root name="game">
                    <Select.Trigger  defaultValue=""  aria-label="Game" className="bg-zinc-900 inline-flex py-3 px-4 rounded text-sm  justify-between items-center">
                        <Select.Value placeholder="Selecione um game que deseja jogar"/>
                        <Select.Icon>
                            <CaretDown />
                        </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal className="bg-zinc-900 py-3 px-4 rounded text-sm text-white cursor-pointer">
                        <Select.Content>
                            <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-zinc-900 cursor-default">
                                <CaretUp/>
                            </Select.ScrollUpButton>
                            <Select.Viewport className="p-1">
                                {games.map(game=>{
                                    return(
                                    <Select.Group key={game.id}>
                                        <Select.Item value={game.id} className="flex relative items-center hover:bg-violet-500 rounded h-6 p-2">
                                            <Select.ItemText >{game.title}</Select.ItemText>
                                        </Select.Item>
                                    </Select.Group>
                                    )
                                })}
                            </Select.Viewport>
                            <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-zinc-900 cursor-default">
                                <CaretDown/>
                            </Select.ScrollDownButton>
                        </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Seu Nome(ou nickname)?</label>
                  <Input name="name" id="name"type="text" placeholder="Como te chamam dentro do game?" required/>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                    <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO"/>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="discord">Qual seu Discord?</label>
                    <Input name="discord" id="discord" type="text" placeholder="Usuario#0000"/>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays">Quando costuma jogar?</label>
                      <ToggleGroup.Root type="multiple" 
                        className="grid grid-cols-4 gap-2"
                        onValueChange={setWeekDays}
                      >
                        <ToggleGroup.Item 
                          value="0"
                          title="Domingo"
                          className={`w-8 h-8 rounded  ${weekDays.includes('0') ? 'bg-violet-500' :'bg-zinc-900'}`}>
                          D
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                          value="1" 
                          title="Segunda"
                          className={`w-8 h-8 rounded  ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                          S
                        </ToggleGroup.Item>
                        <ToggleGroup.Item 
                          value="2" 
                          title="Terça"
                          className={`w-8 h-8 rounded  ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                          T
                        </ToggleGroup.Item>
                        <ToggleGroup.Item 
                          value="3" 
                          title="Quarta"
                          className={`w-8 h-8 rounded  ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                          Q
                        </ToggleGroup.Item>
                        <ToggleGroup.Item 
                          value="4" 
                          title="Quinta"
                          className={`w-8 h-8 rounded  ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                          Q
                        </ToggleGroup.Item>
                        <ToggleGroup.Item 
                          value="5" 
                          title="Sexta"
                          className={`w-8 h-8 rounded  ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                          S
                        </ToggleGroup.Item>
                        <ToggleGroup.Item 
                          value="6" 
                          title="Sábado"
                          className={`w-8 h-8 rounded  ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                          S
                        </ToggleGroup.Item >
                      </ToggleGroup.Root>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hourStart">Qual horário do dia?</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input name="hourStart" id="hourStart" type="time" placeholder="De"/>
                      <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até"/>
                    </div>
                  </div>
                </div>
                <label className="mt-2 flex items-center gap-2 text-sm">
                    <Checkbox.Root 
                          checked={useVoiceChannel}
                          onCheckedChange={(checked) =>{
                            checked === true ? setUseVoiceChannel(true) : setUseVoiceChannel(false);
                          }}
                         className="w-6 h-6 p-1 rounded bg-zinc-900">
                        <Checkbox.Indicator>
                            <Check className="w-4 h-4 text-emerald-400" />
                        </Checkbox.Indicator>
                    </Checkbox.Root>
                      Costumo me conectar ao chat de voz
                </label>
                <footer className="mt-4 flex justify-end gap-4">
                  <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">Cancelar</Dialog.Close>
                  <button className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600" type="submit"><GameController className="w-6 h-6"/>Encontrar duo</button>
                </footer>
              </form>
          </Dialog.Content>
        </Dialog.Portal>
    )
}