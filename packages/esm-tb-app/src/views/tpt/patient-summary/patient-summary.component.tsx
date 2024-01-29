import {
  EmptyStateComingSoon,
  EncounterList,
  EncounterListColumn,
  PatientChartProps,
  SummaryCard,
  SummaryCardColumn,
  getObsFromEncounter,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { useConfig } from '@openmrs/esm-framework';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { moduleName } from '../../..';

const TptPatientSummary: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { config, obsConcepts, encounterTypes } = useConfig();

  const headerRecentTPT = t('recentTptCases', 'Recent TPT Cases');
  const headerPreviousCases = t('previousTptCases', 'Previous TPT Cases');
  const headerVisits = t('visits', 'Visits');

  const recentTbPreventionColumns: SummaryCardColumn[] = useMemo(
    () => [
      {
        key: 'tptTreatmentId',
        header: t('tptTreatmentId', 'TPT Treatment ID'),
        encounterTypes: [encounterTypes.tptCaseEnrollment],
        getObsValue: async ([encounter]) => {
          return getObsFromEncounter(encounter, obsConcepts.tptTreatmentId);
        },
      },
      {
        key: 'tptEnrollmentDate',
        header: t('enrollmentDate', 'Enrollment Date'),
        encounterTypes: [encounterTypes.tptCaseEnrollment],
        getObsValue: async ([encounter]) => {
          return getObsFromEncounter(encounter, obsConcepts.tptEnrollmentDate, true);
        },
      },
      {
        key: 'tptIndication',
        header: t('indication', 'Indication'),
        encounterTypes: [encounterTypes.tptCaseEnrollment],
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.tptIndication);
        },
      },
      {
        key: 'tptRegimen',
        header: t('regimen', 'Regimen'),
        encounterTypes: [encounterTypes.tptCaseEnrollment],
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.tptRegimen);
        },
      },
      {
        key: 'tptAdherence',
        header: t('tptAdherence', 'Adherence'),
        encounterTypes: [encounterTypes.tptTreatmentAndFollowUp],
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.tptAdherence);
        },
      },
      {
        key: 'tptAppointmentDate',
        header: t('nextAppointmentDate', 'Next Appointment Date'),
        encounterTypes: [encounterTypes.tptTreatmentAndFollowUp],
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.tptAppointmentDate, true);
        },
      },
    ],
    [],
  );

  const previousCasesColumns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'tptTreatmentID',
        header: t('tptTreatmentID', 'tpt Treatment ID'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.tptTreatmentID);
        },
      },
    ],
    [],
  );

  const visitsColumns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'tptTreatmentID',
        header: t('tptTreatmentID', 'tpt Treatment ID'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.tptTreatmentID);
        },
      },
    ],
    [],
  );

  return (
    <>
      <SummaryCard
        patientUuid={patientUuid}
        headerTitle={headerRecentTPT}
        columns={recentTbPreventionColumns}
        maxRowItems={4}
      />
      <EncounterList
        patientUuid={patientUuid}
        encounterType={config.encounterTypes.tptCaseEnrollment}
        columns={previousCasesColumns}
        description={headerPreviousCases}
        headerTitle={headerPreviousCases}
        formList={[{ name: 'TPT Case Enrolment form' }]}
        launchOptions={{
          hideFormLauncher: true,
          displayText: '',
          moduleName: moduleName,
        }}
      />
      <EncounterList
        patientUuid={patientUuid}
        encounterType={config.encounterTypes.tbTreatmentAndFollowUp}
        columns={visitsColumns}
        description={headerVisits}
        headerTitle={headerVisits}
        formList={[{ name: 'TPT Followup & Treatment form' }]}
        launchOptions={{
          hideFormLauncher: true,
          displayText: '',
          moduleName: moduleName,
        }}
      />
    </>
  );
};

export default TptPatientSummary;
