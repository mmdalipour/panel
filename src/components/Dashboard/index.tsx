// constants
import { SPACING } from 'constants/spacing';

// components
import Container from '@material-ui/core/Container';
import StatisticsCard from 'components/StatisticsCard';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import SalesReport from 'components/SalesReport';
import BestSelers from 'components/BestSelers';
import CustomerGrowth from 'components/CustomerGrowth';
import NewUsers from 'components/NewUsers';
import Table from 'components/Table';
import StatusChip from 'components/StatusChip';

// data
import Data from 'components/Users/users.json';

// styles
import useStyles from './styles';

/**
 * @component Dashboard
 */
function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box width="100%" display="flex" justifyContent="space-between">
        <Typography variant="h3">خوش آمدید 👋</Typography>
      </Box>
      <Box my={SPACING}>
        <Divider />
      </Box>

      <Container maxWidth="xl">
        <div className={classes.statisticsCardContainer}>
          <StatisticsCard
            title="بازدید"
            dataFor="ماهانه"
            data={1000}
            percentage={10}
            className={classes.card}
          />
          <StatisticsCard
            title="فروش"
            dataFor="ماهانه"
            data={2500}
            percentage={-6}
            className={classes.card}
          />
          <StatisticsCard
            title="فعالیت"
            dataFor="ماهانه"
            data={150}
            percentage={5}
            className={classes.card}
          />
          <StatisticsCard
            title="کاربر جدید"
            dataFor="ماهانه"
            data={10}
            percentage={2}
            className={classes.card}
          />
          <StatisticsCard
            title="میزان رشد"
            dataFor="ماهانه"
            data={25}
            percentage={2}
            usePercentage
            className={classes.card}
          />
        </div>

        <div className={classes.chartsContainer}>
          <div className={classes.gridCell}>
            <BestSelers />
          </div>
          <div className={classes.gridCell}>
            <SalesReport />
          </div>
          <div className={classes.gridCell}>
            <Table
              disableSearch
              title="آخرین سفارشات"
              columns={[
                { field: 'age', title: 'شماره سفارش' },
                { field: 'country', title: 'نام محصول' },
                { field: 'age', title: 'تعداد محصول' },
                { field: 'country', title: 'سفارش دهنده' },
                {
                  field: 'status',
                  title: 'وضعیت',
                  tableCellProps: {
                    align: 'center',
                  },
                  render: (row) => {
                    const getStatus = () => {
                      switch (row.status) {
                        case 'suspended':
                          return 'warning';
                        case 'blocked':
                          return 'error';
                        case 'active':
                          return 'success';
                        default:
                          return undefined;
                      }
                    };
                    return (
                      <StatusChip
                        type={getStatus()}
                        text={row.status}
                        variant="text"
                      />
                    );
                  },
                },
              ]}
              data={Data}
            />
          </div>
          <div className={classes.gridCell}>
            <NewUsers />
          </div>
          <div className={classes.gridCell}>
            <CustomerGrowth />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
