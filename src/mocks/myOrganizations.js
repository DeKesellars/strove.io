const users = [
  {
    name: 'Ashley Patterson',
    photoUrl: 'https://randomuser.me/api/portraits/women/82.jpg',
  }
  {
    name: 'Jason Park',
    photoUrl: 'https://randomuser.me/api/portraits/men/90.jpg',
  },
  {
    name: 'Daewon Song',
    photoUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
  },
]


https://randomuser.me/api/portraits/men/55.jpg
export default {
  api: {
    myOrganizations: {
      isLoading: false,
      data: [
        {
          id: '5e3470b45430d66477ca8d3b',
          name: 'Apollo Tech Inc',
          owner: users[0],
          users: null,
          teams: [
            {
              id: '5e39ce3e99c6bf1d491662dc',
              name: 'Apollo API V2',
              organizationId: '5e3470b45430d66477ca8d3b',
              projects: [
                {
                  id: '5e3b3caf635dab435d9444f5',
                  name: 'Server V2',
                  userId: '5d963f095c058e0fe486d56d',
                  user: users[2],
                  description: 'V1 was finished in 1969 so let\s do V2',
                  isPrivate: false,
                  createdAt: '1580940463504',
                  repoLink: 'https://github.com/apolloTechInc/APIV2.git',
                  machineId: null,
                  editorPort: null,
                  additionalPorts: [
                    [3000, null],
                    [4000, null],
                    [8000, null],
                    [8080, null],
                  ],
                  machineName: null,
                  isVisible: true,
                  teamId: '5e39ce3e99c6bf1d491662dc',
                  forkedFromId: null,
                  __typename: 'Project',
                },
                {
                  id: '5e3c96b9b084836851f7c889',
                  name: 'Apollo Notifications V2',
                  userId: '123',
                  user: users[1],
                  description: 'Deliver stuff like it\s a rocket going to Mars',
                  isPrivate: true,
                  createdAt: '1581029049513',
                  repoLink:
                    'https://github.com/apolloTechInc/NotificationsV2.git',
                  machineId: null,
                  editorPort: null,
                  additionalPorts: [
                    [27017, null],
                    [3000, null],
                    [4000, null],
                    [8000, null],
                    [8080, null],
                  ],
                  machineName: null,
                  isVisible: false,
                  teamId: '5e39ce3e99c6bf1d491662dc',
                  forkedFromId: null,
                  __typename: 'Project',
                },
                {
                  id: '5e3c96b9b084836851f7c889',
                  name: 'Apollo Auth Middleware V2',
                  userId: '123',
                  user: users[0],
                  description: 'Help users join the program',
                  isPrivate: true,
                  createdAt: '1581029049513',
                  repoLink:
                    'https://github.com/apolloTechInc/MiddlewareV2.git',
                  machineId: null,
                  editorPort: null,
                  additionalPorts: [
                    [27017, null],
                    [3000, null],
                    [4000, null],
                    [8000, null],
                    [8080, null],
                  ],
                  machineName: null,
                  isVisible: false,
                  teamId: '5e39ce3e99c6bf1d491662dc',
                  forkedFromId: null,
                  __typename: 'Project',
                },
              ],
              teamLeader: users[0],
              users,
              invited: null,
              __typename: 'Team',
            },
          ],
          paymentId: null,
          customerId: null,
          subscriptionId: null,
          subscriptionStatus: null,
          subscriptionQuantity: null,
          __typename: 'Organization',
        },
      ],
    },
  },
}
