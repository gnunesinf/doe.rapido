import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useTheme } from 'styled-components';

import { fadeLeft } from './animation';
import {
  CompanyDrawerContainer,
  CompanyInfoContainer,
  Header,
  Overlay,
  Close,
} from './styles';
import { ActionButton } from '~/components/ActionButton';
import Modal from '~/components/Modal';
import { Title } from '~/components/Title';
import { CompanyNeedsMap } from '~/constants';
import { getCompanyById } from '~/services/search';
import { Company } from '~/types/Company';

interface CompanyDrawerProps {
  closeModal: VoidFunction;
  companyData: Company;
  companyId: string | null;
}

export function CompanyDrawer({ closeModal, companyData, companyId }: CompanyDrawerProps) {
  const { foreground } = useTheme();

  const [company, setCompany] = useState<Company>(companyData);

  useEffect(() => {
    if (!companyData) {
      getCompanyData();
    }
  }, []);

  async function getCompanyData() {
    if (companyId) {
      try {
        const { data: companyResult } = await getCompanyById(companyId);
        setCompany(companyResult);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    company && (
      <Modal>
        <Overlay
          onClick={closeModal}
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <CompanyDrawerContainer
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            as={motion.div}
            variants={fadeLeft}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Header>
              <Title description={company.name} size="medium" color={foreground.primary} />
              <Close onClick={closeModal}>
                <FaTimes color={foreground.primary} size={24} />
              </Close>
            </Header>
            <CompanyInfoContainer>
              <strong>{company.name}</strong>
              <div className="address">
                <p>
                  {company.street}, {company.number}
                </p>
                <p>
                  {company.district} - {company.city}, {company.state}
                </p>
              </div>
              <div className="distance">
                <strong>
                  Distância aproximada {Number(company.distance / 1000).toFixed(1)}km
                </strong>
              </div>
              <div className="needs">
                <strong>Principais necessidades:</strong>
                <ul>
                  {company.needs.map((need) => (
                    <li key={need}>{CompanyNeedsMap[need]}</li>
                  ))}
                </ul>
              </div>
              <div className="actions">
                <ActionButton type="whats" whatsPhone={company.phone} />
                <ActionButton type="phone" phone={company.phone} />
                <ActionButton type="email" email={company.email} />
                <ActionButton type="share" />
              </div>
            </CompanyInfoContainer>
          </CompanyDrawerContainer>
        </Overlay>
      </Modal>
    )
  );
}
