import { gql, useQuery } from '@apollo/client';

import { client } from '../../services/apollo';
import { SalesDto } from '../../types/ProjectType';

interface ProjectHook {
  loading: boolean;
  data: SalesDto | undefined;
}

export const useSingleProject = (id?: string, fallback?: SalesDto): ProjectHook => {
  const { data: projectData, loading } = useQuery(FETCH_SINGLE_PROJECT_DATA, {
    client,
    variables: {
      id,
    },
  });

  if (!projectData || projectData.sales.length > 1) return { data: undefined, loading };
  try {
    const data: ProjectHook['data'] = projectData && {
      ...projectData.sales[0],
      token: {
        ...projectData.sales[0].token,
        id: projectData.sales[0].token.id.split('-')[1],
      },
    };

    return { data, loading };
  } catch {
    return { data: fallback, loading };
  }
};

const FETCH_SINGLE_PROJECT_DATA = gql(
  `
    query Projects($id: String) {
      sales(where: { id: $id }) {
        id
        token {
          id
          decimals
          walletAddress
        }
        salePrice
        startDate
        endDate
        whitelisted
        featured
        metadataURI
        vestingStartDate
        vestingEndDate
        minUserDepositAmount
        maxUserDepositAmount
        currentDepositAmount
        cap
      }
    }
    `,
);
