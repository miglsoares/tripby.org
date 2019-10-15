import React, { useEffect } from 'react';
import { withTheme } from 'styled-components';
import { useExperienceTracker } from '..';
import { useRouter } from 'next/router';
import { Flex, Box } from 'rebass';
import Text from '../../Text';
import { useQuery } from '@apollo/react-hooks';
import GET_SUBSTANCE from '../../Substance/Page/query';
import Button from '../../Button';
import Container from '../../Container';
import Link from 'next/link';
import ExperienceTrackerStatistics from './Statistics';
import Reset from './Reset';
import { FormattedMessage } from 'react-intl';
import Moon from 'react-moon';
import TimeMachineLegend from './Legend';
import validateSubstance from '../utils/validateSubstance';

const ExperienceTrackerWizard = ({ theme }) => {
  const { substance, roa, start, isActive, phase } = useExperienceTracker();
  const { query, push } = useRouter();
  const { data, loading } = useQuery(GET_SUBSTANCE, {
    variables: { query: query.name },
  });
  const candidate = query.name && data?.substances[0];
  useEffect(() => {
    if (!loading && !isActive && !candidate) {
      push('/');
    }
  }, [isActive, candidate]);
  const validRoas = candidate && validateSubstance(candidate);
  return (
    <Container maxWidth={720}>
      <Text
        variant="secondary"
        textAlign="center"
        fontWeight="medium"
        fontSize={1}
        mb={1}
      >
        <FormattedMessage id="TimeMachine.title" />
      </Text>
      {isActive && (
        <Flex flexDirection="column" alignItems="center" py={3}>
          <Text
            color="heliotrope"
            textAlign="center"
            mb={3}
            fontSize={3}
            fontWeight="500"
          >
            <FormattedMessage id="TimeMachine.status" />{' '}
            <Text
              fontWeight="bold"
              style={{ display: 'inline' }}
              color="purpleHeart"
            >
              <Link href={`/substance?name=${substance.name}`}>
                <a>{substance?.name}</a>
              </Link>
            </Text>{' '}
            ({roa?.name})
          </Text>
          <Box my={4}>
            <Moon
              size={256}
              lightColor={theme.colors.purpleHeart}
              darkColor={theme.greys['400']}
              phase={Math.max(0.033, phase)}
            />
          </Box>
          <TimeMachineLegend mb={4} />
          <ExperienceTrackerStatistics
            mb={4}
            width={1}
            style={{ maxWidth: 320 }}
          />

          <Reset />
        </Flex>
      )}
      {!isActive && candidate && (
        <Box py={3}>
          <Box as="ul" mb={3} fontSize={3}>
            <li>
              <FormattedMessage
                id="TimeMachine.guide.one"
                values={{ candidate: candidate.name }}
              />
            </li>
            <li>
              <FormattedMessage id="TimeMachine.guide.two" />
            </li>
          </Box>
          {validRoas ? (
            <Flex as="ul" m={-1}>
              {validRoas?.map(roa => (
                <li key={roa}>
                  <Button m={1} onClick={() => start(candidate, roa.name)}>
                    {roa}
                  </Button>
                </li>
              ))}
            </Flex>
          ) : (
            <Text>
              <FormattedMessage
                id="TimeMachine.notAvailableRoas"
                values={{ candidate: candidate.name }}
              />
            </Text>
          )}
        </Box>
      )}
      <Text variant="secondary" textAlign="center">
        <FormattedMessage id="TimeMachine.disclaimer" />
      </Text>
    </Container>
  );
};

export default withTheme(ExperienceTrackerWizard);
