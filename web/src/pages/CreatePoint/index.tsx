import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { MapContainer, TileLayer, Marker, useMapEvent } from 'react-leaflet';

import { FiArrowLeft } from 'react-icons/fi';

import { Dropzone } from '../../components/Dropzone';

import axios from 'axios';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.scss';

type Item = {
  id: number;
  title: string;
  image_url: string;
}

type IBGEUFResponse = {
  sigla: string;
}

type IBGECityResponse = {
  nome: string;
}

export function CreatePoint() {
  const history = useHistory();

  const [items, setItems] = useState<Item[]>([]);

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  const [selectedFile, setSelectedFile] = useState<File>();

  // const [initialPosition, setInitialPosition] = useState({
  //   latitude: 0,
  //   longitude: 0,
  // });
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(position => {
  //     const { latitude, longitude } = position.coords;

  //     setInitialPosition({
  //       latitude, 
  //       longitude
  //     })
  //   })
  // }, []);

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    })
  }, []);

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla);

      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    if(selectedUf === '0') 
      return;
    
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
      const cityNames = response.data.map(city => city.nome);
      
      setCities(cityNames);
    });
  }, [selectedUf]);

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;

    setSelectedUf(uf);
  };

  function handelSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;

    setSelectedCity(city);
  };

  function LocationMarker() {
    const map = useMapEvent('click', (e) => {
      map.setView(e.latlng);

      setPosition({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      })
    })
  
    return (
      position.latitude !== 0 ? (
        <Marker interactive={false} position={[position.latitude,position.longitude]} />
      ) : null
    );
  };

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);

      setSelectedItems(filteredItems)
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!name || !email || !whatsapp || !selectedUf || !selectedCity || !position.latitude || !selectedItems || !selectedFile)
      return;

    const data = new FormData();

    const { latitude, longitude } = position;

    data.append('name', name);
    data.append('email', email);
    data.append('whatsapp', whatsapp);
    data.append('uf', selectedUf);
    data.append('city', selectedCity);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('items', selectedItems.join(','));
    data.append('image', selectedFile);

    // const data = {
    //   name,
    //   email,
    //   whatsapp, 
    //   selectedUf,
    //   selectedCity,
    //   latitude,
    //   longitude,
    //   selectedItems
    // }

    // console.log(data);

    await api.post('points', data);

    alert('Ponto de coleta cadastrado com sucesso!')

    history.push('/');
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logoImg} alt="Ecoleta" />

        <Link to="/">
          <FiArrowLeft />

          Voltar para home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro do <br /> ponto de coleta</h1>

        <Dropzone onFileUploaded={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input type="text" name="name" id="name" value={name} onChange={event => setName(event.target.value)} />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email" value={email} onChange={event => setEmail(event.target.value)} />
            </div>

            <div className="field">
              <label htmlFor="whatsapp">WhatsApp</label>
              <input type="text" name="whatsapp" id="whatsapp" value={whatsapp} onChange={event => setWhatsapp(event.target.value)} />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <MapContainer
           center={[-23.5494117,-46.6296634]}
           zoom={11}
          >
            <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
          
            <LocationMarker />
          </MapContainer>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf" value={selectedUf} onChange={handleSelectUf}>
                <option value="0" hidden>Selecione uma UF</option>
    
                { ufs.map(uf => {
                  return (
                    <option key={uf} value={uf}>{uf}</option>
                  )
                }) }
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city" value={selectedCity} onChange={handelSelectCity}>
                <option value="0" hidden>Selecione uma cidade</option>

                { cities.map(city => {
                  return (
                    <option key={city} value={city}>{city}</option>
                  )
                }) }
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Itens de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <ul className="items-grid">
            { items.map(item => {
              return (
                <li key={item.id} onClick={() => handleSelectItem(item.id)} className={selectedItems.includes(item.id) ? 'selected' : ''}>
                  <img src={item.image_url} alt={item.title} />
                  <span>{item.title}</span>
                </li>
              )
            }) }
          </ul>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
}