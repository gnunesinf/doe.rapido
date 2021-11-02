import { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

import { AddressSuggestions } from './components/AddressSuggestions';
import { CompanyList } from './components/CompanyList';
import {
  SearchContainer,
  FiltersContainer,
  SearchBar,
  SearchContent,
  Filters,
} from './styles';
import { Checkbox } from '~/components/Checkbox';
import { Input } from '~/components/Input';
import { Link } from '~/components/Link';
import { PageContainer } from '~/components/PageContainer';
import { Text } from '~/components/Text';
import { Title } from '~/components/Title';
import { CompanyNeedsMap } from '~/constants';
import { useMinWidth } from '~/hooks/useMinWidth';
import { getAddressByGeolocation, getCompanysByNearbyAddress } from '~/services/search';
import { Breakpoint } from '~/styles/variables';
import { CompanyInList } from '~/types/Company';

const AppPage: NextPage = () => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 500 });

  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [companies, setCompanies] = useState<CompanyInList[]>([]);
  const [needsFilters, setNeedsFilters] = useState<Array<string>>([]);
  const minWidth = useMinWidth();

  function handleSelect(description: string) {
    setValue(description, false);
    clearSuggestions();

    searchCompanys();
  }

  async function handleGetCurrentAddress() {
    setIsAddressLoading(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { data: geocodeResponse } = await getAddressByGeolocation(
          String(position.coords.latitude),
          String(position.coords.longitude)
        );
        const address = geocodeResponse.results[0]?.formatted_address;
        setValue(address);

        setIsAddressLoading(false);
      } catch (error) {
        console.error(error);
      }
    });

    setIsAddressLoading(false);
  }

  async function searchCompanys() {
    try {
      const result = await getGeocode({ address: value });
      const { lat, lng } = await getLatLng(result[0]);
      const { data: nearbyCompanies } = await getCompanysByNearbyAddress(
        String(lat),
        String(lng),
        needsFilters
      );
      setCompanies(nearbyCompanies);
    } catch (error) {
      console.error(error);
    }
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSelectNeedFilter(needId: string) {
    const needAlreadayFiltered = needsFilters.find((need) => need === needId);

    needAlreadayFiltered
      ? setNeedsFilters((needs) => needs.filter((need) => need !== needId))
      : setNeedsFilters((needs) => [...needs, needId]);

    searchCompanys();
  }

  return (
    <PageContainer>
      <SearchContainer showingResults={companies.length > 0}>
        <SearchContent>
          <Title
            description="Pesquisa de instituições"
            size={minWidth(Breakpoint.medium) ? 'big' : 'medium'}
          />
          <SearchBar>
            <Input
              label="Digite seu endereço:"
              inputSize="big"
              name="address"
              onChange={handleInput}
              disabled={!ready}
              value={value}
            />
            {status === 'OK' && (
              <AddressSuggestions address={data} handleSelect={handleSelect} />
            )}

            {companies.length > 0 ? (
              <FiltersContainer>
                <Text
                  description="Instituições que precisam de:"
                  fontSize="1.8"
                  isBold={true}
                />
                <Filters>
                  {Object.entries(CompanyNeedsMap).map(([needId, needValue]) => (
                    <Checkbox
                      name={needValue}
                      key={needId}
                      label={needValue}
                      size="medium"
                      onChange={() => handleSelectNeedFilter(needId)}
                    />
                  ))}
                </Filters>
              </FiltersContainer>
            ) : (
              <Link
                label={
                  isAddressLoading ? 'Carregando localização...' : 'Insira minha localização'
                }
                isButton={true}
                handleClick={handleGetCurrentAddress}
              />
            )}
          </SearchBar>
          {companies.length > 0 ? <CompanyList companys={companies} /> : ''}
        </SearchContent>
      </SearchContainer>
    </PageContainer>
  );
};

export default AppPage;
