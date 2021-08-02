import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ryu3 from '../assets/ryu3.png';
import searchIcon from '../assets/search_icon.svg';
import { usePlatformsStats } from '../hooks/apollo/usePlatforms';
import { useProjects } from '../hooks/apollo/useProjects';
import { TextField } from '../shared/gui/TextField';
import { Footer } from '../shared/insets/user/Footer';
import { LoadingData } from '../shared/LoadingData';
import { ProjectCard } from '../shared/ProjectCard';
import { getCardDirection } from '../utils/cardDirectionUtil';
import { sideColor3 } from '../utils/colorsUtil';
import { cs } from '../utils/css';
import { useWindowDimensions } from '../utils/windowDimensionsUtil';
import * as styles from './LaunchpadPage.styles';

const mockProjectsNum = 40;

export const LaunchpadPage = () => {
  const [shownProjects, setShownProjects] = useState<'upcoming' | 'joined' | 'featured' | undefined>('upcoming');
  const [searchTextVisible, setSearchTextVisible] = useState<boolean>(false);

  // const { data: projects, isLoading: projectsLoading } = useProjects(shownProjects);
  // const { data: launchpadDetails, isLoading: launchpadDetailsLoading } = useLaunchpadDetails();

  const { width } = useWindowDimensions();

  const methods = useForm({
    defaultValues: {
      search: '',
    },
    //resolver: yupResolver(loginValidationSchema),
  });

  const onSearch = async ({ search }: any) => {
    try {
      console.log('search', search);
      // const { token } = await generalHTTP.login(email, message);
      // localStorage.setItem('token', token);
      // window.location.reload();
    } catch (e) {
      console.log(e);
      // show notification or error message
    }
  };

  const { data: platformsData } = usePlatformsStats();
  const { data: projectsData, loading: projectLoading } = useProjects();

  if (projectLoading) {
    return <LoadingData />;
  }

  return (
    <div>
      <div className={styles.imageContainerClassName}>
        <div style={{ position: 'relative' }}>
          <div className={styles.customObjectClassName} style={styles.topLeftBottomRightNotch} />

          <div className={styles.mainImageContainerClassName}>
            <img className={styles.mainImageStyle} src={ryu3} />
            <div style={styles.imageShadowStyle} />
          </div>
        </div>

        <div className={styles.launchpadParentClassName}>
          <div className={styles.launchpadTextClassName}>LAUNCHPAD</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={styles.launchpadDetailsItemStyle}>
              <div className={styles.boldTextStyle} style={{ flex: 1, color: `${sideColor3}` }}>
                Projects launched
              </div>
              <div className={styles.boldTextStyle} style={{ color: `${sideColor3}` }}>
                {platformsData?.platforms[0].numOfProjects}
              </div>
            </div>
            <div style={styles.launchpadDetailsItemStyle}>
              <div className={styles.normalTextStyle} style={{ flex: 1 }}>
                Funds raised
              </div>
              <div className={styles.boldTextStyle}>{platformsData?.platforms[0].fundsRaised} USDT</div>
            </div>
            <div style={styles.launchpadDetailsItemStyle}>
              <div className={styles.normalTextStyle} style={{ flex: 1 }}>
                Users participated
              </div>
              <div className={styles.boldTextStyle}>{platformsData?.platforms[0].numOfUsers}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.projectsCardsHeaderClassName}>
        <div style={{ flex: 1, display: 'flex' }}>
          <div
            className={styles.projectsCardsHeaderItemClassName}
            style={shownProjects === 'upcoming' ? styles.selectedTabStyle : {}}
            onClick={() => {
              setShownProjects('upcoming');
            }}>
            Upcoming
          </div>
          <div
            className={styles.projectsCardsHeaderItemClassName}
            style={shownProjects === 'featured' ? styles.selectedTabStyle : {}}
            onClick={() => {
              setShownProjects('featured');
            }}>
            Featured
          </div>
          <div
            className={styles.projectsCardsHeaderItemClassName}
            style={shownProjects === 'joined' ? styles.selectedTabStyle : {}}
            onClick={() => {
              setShownProjects('joined');
            }}>
            Joined
          </div>
          <div
            className={styles.projectsCardsHeaderItemClassName}
            style={shownProjects === undefined ? styles.selectedTabStyle : {}}
            onClick={() => {
              setShownProjects(undefined);
            }}>
            All
          </div>
        </div>
        <div className={styles.searchParentClassName} style={searchTextVisible ? { width: '18.8rem' } : {}}>
          {!searchTextVisible && (
            <img
              style={cs(styles.searchIconStyle, { marginBottom: '0.06rem' })}
              src={searchIcon}
              onClick={() => {
                setSearchTextVisible(true);
              }}
            />
          )}
          {searchTextVisible && (
            <div style={styles.searchFormContainerStyle}>
              <FormProvider {...methods}>
                <form style={styles.searchFormStyle}>
                  <TextField name="search" placeholder="Search here" type={'none'} mode={'dark'} autoFocus={true} />
                  <img style={styles.searchIconStyle} src={searchIcon} onClick={methods.handleSubmit(onSearch)} />
                </form>
              </FormProvider>
            </div>
          )}
        </div>
      </div>
      <div className={styles.projectsCardsContainerParentClassName}>
        <div className={styles.projectsCardsContainerClassName}>
          {!projectLoading &&
            projectsData?.sales.map((project, index) => {
              return <ProjectCard key={index} project={project} direction={getCardDirection(width, index)} />;
            })}
          {projectLoading &&
            projectsData?.sales.map((el, index) => (
              <ProjectCard key={index} direction={getCardDirection(width, index)} />
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
