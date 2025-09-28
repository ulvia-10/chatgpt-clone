import {
  BacklogDashboardIcon,
  BacklogDetailIcon,
  BacklogIcon,
  ComponentDashboardIcon,
  ComponentDetailIcon,
  ComponentIcon,
  DashboardHealthIcon,
  DashboardPlanIcon,
  HealthScoreIcon,
  InfoIcon,
  LubricantDashboardIcon,
  LubricantDetailIcon,
  LubricantIcon,
  LubricantTrendIcon,
  PCARDashboardIcon,
  PCARDetailIcon,
  PCARIcon,
  PlanIcon,
  PopulationIcon,
  PopulationSMRIcon,
  UpdatePlanIcon,
  UpdatePopulationIcon,
  UpdateSMRIcon,
  VHMSDashboardIcon,
  VHMSFaultHistoryIcon,
  VHMSFleetMonitoringIcon,
  VHMSIcon,
  VHMSOverallTrendIcon,
  VHMSPayloadDashboardIcon,
  VHMSPayloadFleetIcon,
  VHMSPayloadIcon,
  VHMSPayloadUnitIcon,
  VHMSTrendIcon,
} from '@/components/atoms/icons'

const featureFlags = JSON.parse(import.meta.env.REACT_APP_FEATURE_FLAGS)
const isQ1Enabled = featureFlags.Q1 === 'enabled'
const isQ2Enabled = featureFlags.Q2 === 'enabled'
const isPlanEnabled = featureFlags.PLAN === 'enabled'

export const SIDEBAR_MENU = {
  navMain: [
    ...(isQ1Enabled
      ? [
          {
            title: 'Health Score',
            url: '#',
            icon: HealthScoreIcon,
            items: [
              {
                title: 'Dashboard Health Score',
                url: '/health-score/dashboard',
                icon: DashboardHealthIcon,
              },
            ],
          },
        ]
      : []),
    ...(isQ2Enabled
      ? [
          {
            title: 'MCM',
            url: '#',
            icon: VHMSIcon,
            items: [
              {
                title: 'Dashboard',
                url: '/mcm/dashboard',
                icon: VHMSDashboardIcon,
              },
              {
                title: 'Trend',
                url: '/mcm/trend',
                icon: VHMSTrendIcon,
              },
              {
                title: 'Overall Trend',
                url: '/mcm/overall-trend',
                icon: VHMSOverallTrendIcon,
              },
              {
                title: 'Fleet Monitoring',
                url: '/mcm/fleet-monitoring',
                icon: VHMSFleetMonitoringIcon,
              },
              {
                title: 'Fault History',
                url: '/mcm/fault-history',
                icon: VHMSFaultHistoryIcon,
              },
              {
                title: 'Payload',
                url: '/mcm/payload',
                icon: VHMSPayloadIcon,
                items: [
                  {
                    title: 'Dashboard',
                    url: '/mcm/payload/dashboard',
                    icon: VHMSPayloadDashboardIcon,
                  },
                  {
                    title: 'Unit Production',
                    url: '/mcm/payload/unit-production',
                    icon: VHMSPayloadUnitIcon,
                  },
                  {
                    title: 'Fleet Production',
                    url: '/mcm/payload/fleet-production',
                    icon: VHMSPayloadFleetIcon,
                  },
                ],
              },
            ],
          },
          {
            title: 'Lubricant Analysis',
            url: '#',
            icon: LubricantIcon,
            items: [
              {
                title: 'Dashboard',
                url: '/lubricant-analysis/dashboard',
                icon: LubricantDashboardIcon,
              },
              {
                title: 'Trend',
                url: '/lubricant-analysis/trend',
                icon: LubricantTrendIcon,
              },
              {
                title: 'Detail',
                url: '/lubricant-analysis/detail',
                icon: LubricantDetailIcon,
              },
            ],
          },
          {
            title: 'Backlog',
            url: '#',
            icon: BacklogIcon,
            items: [
              {
                title: 'Dashboard',
                url: '/backlog/dashboard',
                icon: BacklogDashboardIcon,
              },
              {
                title: 'Detail',
                url: '/backlog/detail',
                icon: BacklogDetailIcon,
              },
            ],
          },
          {
            title: 'PCAR',
            url: '#',
            icon: PCARIcon,
            items: [
              {
                title: 'Dashboard',
                url: '/pcar/dashboard',
                icon: PCARDashboardIcon,
              },
              {
                title: 'Detail',
                url: '/pcar/detail',
                icon: PCARDetailIcon,
              },
            ],
          },
          {
            title: 'Population & SMR',
            url: '#',
            icon: PopulationIcon,
            items: [
              {
                title: 'Dashboard',
                url: '/population-smr/dashboard',
                icon: PopulationSMRIcon,
              },
              {
                title: 'Update Population',
                url: '/population-smr/update-population',
                icon: UpdatePopulationIcon,
              },
              {
                title: 'Update SMR',
                url: '/population-smr/update-smr',
                icon: UpdateSMRIcon,
              },
            ],
          },
          {
            title: 'Component',
            url: '#',
            icon: ComponentIcon,
            items: [
              {
                title: 'Dashboard',
                url: '/component/dashboard',
                icon: ComponentDashboardIcon,
              },
              {
                title: 'Detail',
                url: '/component/detail',
                icon: ComponentDetailIcon,
              },
            ],
          },
          ...(isPlanEnabled
            ? [
                {
                  title: 'Plan',
                  url: '#',
                  icon: PlanIcon,
                  items: [
                    {
                      title: 'Dashboard Plan',
                      url: '/plan/dashboard',
                      icon: DashboardPlanIcon,
                    },
                    {
                      title: 'Update Plan',
                      url: '/plan/update',
                      icon: UpdatePlanIcon,
                    },
                  ],
                },
              ]
            : []),

          {
            title: 'Upload Data',
            url: '#',
            icon: PlanIcon,
            items: [
              {
                title: 'Import History',
                url: '/upload-data/dashboard',
                icon: DashboardPlanIcon,
              },
              {
                title: 'Upload Data',
                url: '/upload-data/upload-data?tabs=komtrax-plus',
                icon: UpdatePlanIcon,
              },
            ],
          },
        ]
      : []),
  ],
  info: [
    {
      title: process.env.BUILD_ID ?? 'unknown version',
      icon: InfoIcon,
    },
  ],
}
