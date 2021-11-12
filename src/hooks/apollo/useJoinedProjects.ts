import { gql, useLazyQuery } from '@apollo/client';

import { client } from '../../services/apollo';
import { SalesDto } from '../../types/ProjectType';

interface ProjectsHook {
  loading: boolean;
  data: SalesDto[];
  getJoinedProjects: Function;
}

export const useJoinedProjects = (): ProjectsHook => {
  const [getJoinedProjects, { data: joinedProjectData, loading }] = useLazyQuery(FETCH_JOINED_PROJECTS, {
    client,
  });

  const data: SalesDto[] = joinedProjectData?.user?.allocations.map((joinedProject: { sale: SalesDto }): SalesDto => {
    return {
      ...joinedProject.sale,
      token: {
        ...joinedProject.sale.token,
        id: joinedProject.sale.token.id.split('-')[1],
      },
    };
  });

  return { getJoinedProjects, data, loading };
};

const FETCH_JOINED_PROJECTS = gql(
  `
  query UserProjects($userAddress: String) {
    user( id: $userAddress ) { 
    allocations {
      sale {
        id
        salePrice
        startDate
        endDate
        whitelisted
        featured
        metadataURI
        minUserDepositAmount
        maxUserDepositAmount
        cap
        currentDepositAmount
        vestingStartDate
        vestingEndDate
        token {
            id
        }
      }
    }
    }
  }`,
);
