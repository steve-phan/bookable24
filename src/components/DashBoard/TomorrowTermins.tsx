import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridItem from '../custom/Grid/GridItem';
import GridContainer from '../custom/Grid/GridContainer';
import Table from '../custom/Table/Table';
import Card from '../custom/Card/Card';
import CardHeader from '../custom/Card/CardHeader';
import CardBody from '../custom/Card/CardBody';

import styles from '../../themes/components/tableStyle';
import { ShopContext } from '../../context/contextShop';
import { getTime, getDetails, mappedTime } from '../../utils';
import moment from 'moment';

const useStyles = makeStyles(styles);

export default function TomorrowTermins() {
  const [{ isShopLogged, email, allTermins, terminIsLoaded }, dispatch] =
    React.useContext(ShopContext);
  const classes = useStyles();
  const tableData = allTermins
    ?.filter(
      (item) =>
        item.selectedDate === moment().add(1, 'days').format('DD-MM-YYYY')
    )
    .map((termin, i) => [
      i,
      `${termin.first_name} ${termin.last_name} (${termin.person})`,
      `${getTime(termin.selectedSlot)} ${mappedTime(termin.selectedDate)}`,
      getDetails(termin?.require || '', termin?.phone),
    ]);
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color='primary'>
            <h4 className={classes.cardTitleWhite}>Booking ngày mai</h4>
            <p className={classes.cardCategoryWhite}></p>
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
// [
//   ['1', 'Dakota Rice', '$36,738', 'Niger', 'Oud-Turnhout'],
//   ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
//   ['3', 'Sage Rodriguez', '$56,142', 'Netherlands', 'Baileux'],
//   [
//     '4',
//     'Philip Chaney',
//     '$38,735',
//     'Korea, South',
//     'Overland Park',
//   ],
//   [
//     '5',
//     'Doris Greene',
//     '$63,542',
//     'Malawi',
//     'Feldkirchen in Kärnten',
//   ],
//   ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester'],
// ]
