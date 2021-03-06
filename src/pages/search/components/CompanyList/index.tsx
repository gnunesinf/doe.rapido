import { useRouter } from 'next/router';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';

import { ButtonMap, CompanyListContainer, ItemInfo, SkeletonContainer } from './styles';
import { Button } from '~/components/Button';
import { Text } from '~/components/Text';
import { useMinWidth } from '~/hooks/useMinWidth';
import { Breakpoint } from '~/styles/variables';
import { CompanyInList } from '~/types/Company';

interface CompanyListProps {
  companys: Array<CompanyInList>;
  needsSelected: string[];
}

export function CompanyList({ companys, needsSelected }: CompanyListProps) {
  const routes = useRouter();
  const minWidth = useMinWidth();

  function handleSeeOnMap(id: string) {
    const route = `/search/map?id=${id}${
      needsSelected.length ? `&needs=${String(needsSelected)}` : ''
    }&drawerId=${id}`;

    routes.push(route);
  }

  return (
    <CompanyListContainer>
      <Text fontSize="1.8" description="Resultados:" isBold={true} />
      <ul>
        {companys.map((company) => (
          <li
            key={company.id_company}
            onClick={
              !minWidth(Breakpoint.small)
                ? () => handleSeeOnMap(String(company.id_company))
                : undefined
            }
          >
            <ItemInfo>
              <strong>{company.name}</strong>
              <p>{company.address}</p>
              <span>
                Distância aproximada: {Number(company.distance / 1000).toFixed(1)}km
              </span>
            </ItemInfo>
            {minWidth(Breakpoint.small) ? (
              <Button
                variant="primary"
                description="Ver no mapa"
                onClick={() => handleSeeOnMap(String(company.id_company))}
              />
            ) : (
              <ButtonMap>
                <FaMapMarkerAlt color="#fff" size={24} />
              </ButtonMap>
            )}
          </li>
        ))}
      </ul>
    </CompanyListContainer>
  );
}

export function CompanyListSkeleton() {
  return (
    <SkeletonContainer>
      <div className="header">
        <Skeleton height={30} />
      </div>
      <div className="results">
        <Skeleton count={4} height={100}></Skeleton>
      </div>
    </SkeletonContainer>
  );
}
