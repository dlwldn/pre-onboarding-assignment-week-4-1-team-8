import React from 'react';
import BROKERS from '../../lib/db/brokers.json';
import ACCOUNT_STATUS from '../../lib/db/accountStatus.json';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserQuery } from '../../hooks';
import useAccountDetailQuery from '../../hooks/queries/useAccountDetailQuery';
import {
  DEFAULT_PAGE_LIMIT_COUNT,
  DEFAULT_PAGE_NUMBER,
  getChangedDate,
  getChangedMaskingAccount,
} from '../../lib';
import { Button, Descriptions } from 'antd';
import styled from 'styled-components';

function AccountDetailContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: users } = useUserQuery({
    page: DEFAULT_PAGE_NUMBER,
    limit: DEFAULT_PAGE_LIMIT_COUNT,
  });
  const { data: account } = useAccountDetailQuery(
    {
      id: location.pathname.split('/')[2],
    },
    {
      enabled: Boolean(users),
      select: (data) => {
        const {
          user_id,
          broker_id,
          status,
          number,
          name,
          assets,
          payments,
          is_active,
          created_at,
          updated_at,
        } = data;
        return {
          accountName: name,
          userName: users.find((user) => user.id === user_id).name,
          brokerName: BROKERS[broker_id],
          status: Object.values(ACCOUNT_STATUS).map(
            (accountStatus, statusIndex) => {
              const accountStatusNames = Object.keys(ACCOUNT_STATUS);
              return (
                accountStatus === status && accountStatusNames[statusIndex]
              );
            }
          ),
          number: getChangedMaskingAccount(number),
          assets: Number(parseInt(assets)).toLocaleString(),
          payments: Number(parseInt(payments)).toLocaleString(),
          isActive: is_active ? '활성' : '비활성',
          createdAt: getChangedDate(created_at),
          updatedAt: getChangedDate(updated_at),
        };
      },
    }
  );

  const handleClickBackButton = () => {
    navigate(-1);
  };

  if (!account) return null;

  return (
    <div>
      <Descriptions title="계좌 상세정보" bordered column={3}>
        <Descriptions.Item label="사용자 명" span={3}>
          {account.userName}
        </Descriptions.Item>
        <Descriptions.Item label="계좌 명" span={3}>
          {account.accountName}
        </Descriptions.Item>
        <Descriptions.Item label="계좌 번호" span={3}>
          {account.number}
        </Descriptions.Item>
        <Descriptions.Item label="계좌 상태" span={3}>
          {account.status}
        </Descriptions.Item>
        <Descriptions.Item label="브로커 명" span={3}>
          {account.brokerName}
        </Descriptions.Item>
        <Descriptions.Item label="계좌 생성 일자" span={3}>
          {account.createdAt}
        </Descriptions.Item>
        <Descriptions.Item label="계좌 업데이트 일자" span={3}>
          {account.updatedAt}
        </Descriptions.Item>
        <Descriptions.Item label="평가금액">
          {account.assets} 원
        </Descriptions.Item>
        <Descriptions.Item label="입금금액">
          {account.payments} 원
        </Descriptions.Item>
        <Descriptions.Item label="계좌 활성 여부">
          {account.isActive}
        </Descriptions.Item>
      </Descriptions>
      <ButtonWrapper>
        <Button onClick={handleClickBackButton} type="primary" size="large">
          뒤로가기
        </Button>
      </ButtonWrapper>
    </div>
  );
}

export default AccountDetailContent;

const ButtonWrapper = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: center;
`;
