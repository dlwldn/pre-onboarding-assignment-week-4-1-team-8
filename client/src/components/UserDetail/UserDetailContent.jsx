import { Button, Descriptions } from 'antd';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAccountQuery, useUserSettingQuery } from '../../hooks';
import useUserDetailQuery from '../../hooks/queries/useUserDetailQuery';
import {
  DEFAULT_PAGE_LIMIT_COUNT,
  DEFAULT_PAGE_NUMBER,
  getChangedDate,
  getChangedMaskingPhoneNumber,
} from '../../lib';

function UserDetailContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: accounts } = useAccountQuery({
    page: DEFAULT_PAGE_NUMBER,
    limit: DEFAULT_PAGE_LIMIT_COUNT,
  });
  const { data: userSettings } = useUserSettingQuery({
    page: DEFAULT_PAGE_NUMBER,
    limit: DEFAULT_PAGE_LIMIT_COUNT,
  });
  const { data: user } = useUserDetailQuery(
    {
      id: location.pathname.split('/')[2],
    },
    {
      enabled: Boolean(accounts) && Boolean(userSettings),
      select: (data) => {
        const {
          birth_date,
          created_at,
          email,
          gender_origin,
          id,
          name,
          phone_number,
          last_login,
          uuid,
          photo,
          address,
          detail_address,
        } = data;
        return {
          userName: name,
          accountCount: accounts.filter((account) => account.user_id === id)
            .length,
          allowMarketingPush: userSettings.find(
            (setting) => setting.uuid === uuid
          )?.allow_marketing_push
            ? 'O'
            : 'X',
          isStaff: userSettings.find((setting) => setting.uuid === uuid)
            ?.is_staff
            ? 'O'
            : 'X',
          isActive: userSettings.find((setting) => setting.uuid === uuid)
            ?.is_active
            ? '활성'
            : '비활성',
          genderOrigin: gender_origin,
          birthDate: getChangedDate(birth_date),
          createdAt: getChangedDate(created_at),
          phoneNumber: getChangedMaskingPhoneNumber(phone_number),
          lastLogin: getChangedDate(last_login, '-', {
            isNeedTime: true,
            timeDelimeter: ':',
          }),
          address: `${address} ${detail_address}`,
          photo,
          email,
        };
      },
    }
  );

  const handleClickBackButton = () => {
    navigate(-1);
  };

  if (!user) return null;

  return (
    <div>
      <Descriptions
        title={
          <div>
            <h3>유저 상세정보</h3>
            <UserProfile src={user.photo} alt={user.userName} />
          </div>
        }
        bordered
      >
        <Descriptions.Item label="사용자 명" span={3}>
          {user.userName}
        </Descriptions.Item>
        <Descriptions.Item label="보유중인 계좌수" span={3}>
          {user.accountCount}
        </Descriptions.Item>
        <Descriptions.Item label="이메일" span={3}>
          {user.email}
        </Descriptions.Item>
        <Descriptions.Item label="주민등록상 성별코드" span={3}>
          {user.genderOrigin}
        </Descriptions.Item>
        <Descriptions.Item label="생년월일" span={3}>
          {user.birthDate}
        </Descriptions.Item>
        <Descriptions.Item label="휴대폰 번호" span={3}>
          {user.phoneNumber}
        </Descriptions.Item>
        <Descriptions.Item label="주소" span={3}>
          {user.address}
        </Descriptions.Item>
        <Descriptions.Item label="가입일" span={1}>
          {user.createdAt}
        </Descriptions.Item>
        <Descriptions.Item label="최근 로그인" span={2}>
          {user.lastLogin}
        </Descriptions.Item>
        <Descriptions.Item label="혜택 수신 동의 여부">
          {user.allowMarketingPush}
        </Descriptions.Item>
        <Descriptions.Item label="임직원 계좌 보유 여부">
          {user.allowMarketingPush}
        </Descriptions.Item>
        <Descriptions.Item label="활성화 여부">
          {user.isActive}
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

export default UserDetailContent;

const ButtonWrapper = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: center;
`;
const UserProfile = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-top: 20px;
`;
