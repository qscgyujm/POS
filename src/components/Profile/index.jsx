import React from 'react';
import styled from 'styled-components';

const ProfileWrapper = styled.div`
`;

const SectionWrapper = styled.section`
  margin-bottom: 15px;
`;

const SectionTitle = styled.p`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 700;
`;

const SectionContent = styled.label`
`;

const SectionInput = styled.input`
  width: 100%;
`;

const Profile = (props) => {
  const {
    localProfile,
    setLocalProfile,
    isEdit,
    isRegister,
    isInEdit,
  } = props;
  const { email, name, location } = localProfile;

  const changeEmailHandler = (e) => {
    setLocalProfile({
      ...localProfile,
      email: e.target.value,
    });
  };

  const changeNameHandler = (e) => {
    setLocalProfile({
      ...localProfile,
      name: e.target.value,
    });
  };

  const changePasswordHandler = (e) => {
    setLocalProfile({
      ...localProfile,
      password: e.target.value,
    });
  };

  const changeLocationHandler = (e) => {
    setLocalProfile({
      ...localProfile,
      location: e.target.value,
    });
  };

  return (
    <ProfileWrapper>
      <SectionWrapper>
        <SectionTitle>Email</SectionTitle>
        {
          !isEdit
          || isInEdit
            ? (
              <SectionContent>
                {email}
              </SectionContent>
            )
            : (
              <SectionInput
                value={email}
                onChange={changeEmailHandler}
              />
            )
        }
      </SectionWrapper>
      <SectionWrapper>
        <SectionTitle>Name</SectionTitle>
        {
          !isEdit
            ? (
              <SectionContent>
                {name}
              </SectionContent>
            )
            : (
              <SectionInput
                value={name}
                onChange={changeNameHandler}
              />
            )
        }
      </SectionWrapper>
      {
        isRegister
        && (
          <SectionWrapper>
            <SectionTitle>Password</SectionTitle>
            <SectionInput
              type="password"
              value={localProfile.password}
              onChange={changePasswordHandler}
            />
          </SectionWrapper>
        )
      }
      <SectionWrapper>
        <SectionTitle>Location</SectionTitle>
        {
          !isEdit
            ? (
              <SectionContent>
                {location}
              </SectionContent>
            )
            : (
              <SectionInput
                value={location}
                onChange={changeLocationHandler}
              />
            )
        }
      </SectionWrapper>
    </ProfileWrapper>
  );
};

export default Profile;
