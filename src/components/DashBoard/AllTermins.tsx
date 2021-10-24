// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router';
import { ShopContext } from '../../context/contextShop';
import styles from '../../themes/components/tableStyle';
import { getDetails, getTime, mappedTime } from '../../utils';
import Card from '../custom/Card/Card';
import CardBody from '../custom/Card/CardBody';
import CardHeader from '../custom/Card/CardHeader';
import GridContainer from '../custom/Grid/GridContainer';
// core components
import GridItem from '../custom/Grid/GridItem';
import Table from '../custom/Table/Table';

const useStyles = makeStyles(styles);

export default function AllTermins() {
  const [{ allTermins, shopInfo }, dispatch] = React.useContext(ShopContext);
  const classes = useStyles();
  const history = useHistory();
  // const shopName = history.location.pathname.replace('/', '');
  // if (shopName.split('/').length > 1) {
  //   history.push('/');
  // }
  // Friday 30 Jul
  const tableData = allTermins?.map((termin, i) => [
    i,
    `${termin.first_name} ${termin.last_name} \n\t (${termin.person} persons)`,
    `${getTime(termin.selectedSlot)} ${
      termin.selectedDate.length === 6
        ? termin.selectedDate
        : mappedTime(termin.selectedDate)
    }`,
    getDetails(termin?.require || '', termin?.phone),
  ]);
  console.log('all termins', allTermins);
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color='primary'>
            <h4 className={classes.cardTitleWhite}>Tất cả Booking</h4>
            <p className={classes.cardCategoryWhite}>
              {/* Click on its to get more details (client required, contact ...){' '} */}
            </p>
          </CardHeader>
          {!!tableData && (
            <CardBody>
              <Table
                tableHeaderColor='primary'
                tableHead={[
                  'Stt',
                  'Họ tên-Số người',
                  'Thời gian',
                  'Yêu cầu-SDT',
                ]}
                tableData={tableData}
              />
            </CardBody>
          )}
        </Card>
      </GridItem>
    </GridContainer>
  );
}
