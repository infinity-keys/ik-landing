import { StepType } from 'types/graphql'

// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  step: {
    id: '42',
  },
})

export const stepBySlug = (/* vars, { ctx, req } */) => ({
  step: {
    id: '123',
    stepSortWeight: 1,
    type: 'SIMPLE_TEXT' as StepType,
    puzzle: {
      steps: [
        {
          id: '123',
          stepSortWeight: 1,
        },
      ],
      rewardable: {
        name: 'rewardable',
        slug: 'rewardable',
      },
    },
  },
})
