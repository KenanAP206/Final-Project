// Pages/Admin/Dashboard/index.jsx
import React, { useMemo } from 'react';
import { useGetList } from 'react-admin';
import { 
  Card, 
  CardContent, 
  CardHeader,
  Grid,
  useMediaQuery
} from '@mui/material';
import { subDays, startOfDay } from 'date-fns';
import UserList from './UserList'; // Kullanıcı listesi bileşeni
import ShowsChart from './ShowsChart'; // Dizi ve film grafiği bileşeni
import Welcome from './Welcome'; // Hoş geldiniz bileşeni

const Dashboard = () => {
  const isXSmall = useMediaQuery((theme) =>
    theme.breakpoints.down('sm')
  );
  const isSmall = useMediaQuery((theme) =>
    theme.breakpoints.down('lg')
  );
  const aMonthAgo = useMemo(() => subDays(startOfDay(new Date()), 30), []);

  const { data: shows } = useGetList('shows', {
    filter: { date_gte: aMonthAgo.toISOString() }, // Son 30 gün içinde eklenen diziler
    sort: { field: 'releaseDate', order: 'DESC' },
    pagination: { page: 1, perPage: 50 },
  });

  const { data: users } = useGetList('users', {
    pagination: { page: 1, perPage: 10 },
    sort: { field: 'name', order: 'ASC' },
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Welcome /> {/* Hoş geldiniz bileşeni */}
      </Grid>
      <Grid item xs={12} md={8}>
        <Card>
          <CardHeader title="Shows and Movies Statistics" />
          <CardContent>
            <ShowsChart data={shows} /> {/* Dizi ve film grafiği bileşeni */}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader title="Users" />
          <CardContent>
            <UserList users={users} /> {/* Kullanıcı listesi bileşeni */}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;