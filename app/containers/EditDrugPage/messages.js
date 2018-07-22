/*
 * EditDrugPage Messages
 *
 * This contains all the text for the EditDrugPage component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  meta: {
    id: 'app.containers.EditDrugPage.meta',
    title: 'Edit drug',
  },
  header: {
    id: 'app.containers.EditDrugPage.header',
    defaultMessage: 'Edit {drug}',
  },
  sections: {
    id: 'app.containers.EditDrugPage.sections',
    submit: {
      title: 'Summary of changes',
      loading: 'Submitting...',
      success: 'Suggestion {id} submited!',
    },
    basics: {
      title: 'Basics',
      form: {
        name: {
          label: 'Name',
        },
        aliases: {
          label: 'Aliases',
          placeholder: 'Write and press ↵ to add',
        },
        classes: {
          label: 'Classes',
        },
        routes: {
          label: 'Routes of administration',
        },
        alerts: {
          label: 'Alerts',
        },
      },
    },
    summary: {
      title: 'Summary',
      form: {
        summary: {
          label: 'Summary',
        },
      },
    },
    effects: {
      title: 'Effects',
      form: {
        effects: {
          label: 'Select the effects for this drug',
        },
        filter: {
          placeholder: 'Filter...',
        },
      },
    },
    health: {
      title: 'Health',
      form: {
        health: {
          label: 'Health',
        },
      },
    },
    law: {
      title: 'Law',
      form: {
        law: {
          label: 'Law',
        },
      },
    },
  },
})