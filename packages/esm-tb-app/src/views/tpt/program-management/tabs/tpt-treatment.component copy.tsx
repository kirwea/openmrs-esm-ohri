import React from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '@openmrs/esm-framework';
import { EncounterList, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';

interface TptTreatmentListProps {
  patientUuid: string;
}

const TptTreatmentList: React.FC<TptTreatmentListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig();
  const headerTitle = t('tptTreatment', 'TPT Treatment');
  const columns = [
    {
      key: 'caseId',
      header: t('caseId', 'case Id'),
      getValue: (encounter: any) => {
        return getObsFromEncounter(encounter, config.obsConcepts.tptTreatmentId);
      },
    },
    {
      key: 'visitDate',
      header: t('visitDate', 'visit Date'),
      getValue: (encounter: any) => {
        return getObsFromEncounter(encounter, config.obsConcepts.followUpCaseId);
      },
    },
    {
      key: 'Regimen',
      header: t('Regimen', 'Regimen'),
      getValue: (encounter: any) => {
        return getObsFromEncounter(encounter, config.obsConcepts.tptRegimen);
      },
    },
    {
      key: 'Adherence',
      header: t('Adherence', 'Adherence'),
      getValue: (encounter: any) => {
        return getObsFromEncounter(encounter, config.obsConcepts.tptAdherence);
      },
    },
    {
      key: 'treatmentPlan',
      header: t('treatmentPlan', 'treatment Plan'),
      getValue: (encounter: any) => {
        return getObsFromEncounter(encounter, config.obsConcepts.treatmentPlan);
      },
    },
    {
      key: 'nextAppointment',
      header: t('nextAppointment', 'next Appointment'),
      getValue: (encounter: any) => {
        return getObsFromEncounter(encounter, config.obsConcepts.tptAppointmentDate);
      },
    },
    {
      key: 'actions',
      header: t('actions', 'actions'),
      getValue: (encounter: any) => {
        return getObsFromEncounter(encounter, config.obsConcepts.actionTaken);
      },
    },
  ];
  // eslint-disable-next-line no-empty-pattern

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={config.encounterTypes.tptCaseEnrollment}
      formList={[{ name: 'TPT Case Enrolment form' }]}
      description={headerTitle}
      headerTitle={headerTitle}
      columns={columns}
      launchOptions={{
        moduleName: '',
        hideFormLauncher: false,
        displayText: 'headerTitle',
        workspaceWindowSize: 'minimized',
      }}
    />
  );
};

export default TptTreatmentList;
