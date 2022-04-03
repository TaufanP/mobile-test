import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAvoidingView} from 'react-native';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch} from 'react-redux';
import {DummyFlatList, Gap} from '~components/atoms';
import {FluidButton, Header} from '~components/molecules';
import ProfilePhoto from '~components/molecules/ProfilePhoto';
import {Canvas} from '~components/organisms';
import PhraseInput from '~components/organisms/PhraseInput';
import spaces from '~constants/spaces';
import {dateFormatter, emailValidate, isIos} from '~helpers';
import {useContactDetail, useNavigate} from '~hooks';
import {dispatchContacts} from '~redux/actions';
import {IContact, RootStackParamList} from '~types';
import styles from './styles';

const shouldValidate = {shouldValidate: true};

const ContactForm = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ContactForm'>>();
  const {id} = route?.params || {};

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const userDetail = useContactDetail(id);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    setValue,
    getValues,
  } = useForm<IContact>({
    defaultValues: {
      name: '',
      bio: '',
      born: '',
      email: '',
      photo: '',
    },
    mode: 'onChange',
  });

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      editSetter();
    }, 400);
  }, [id]);

  const buttonLabel = !!id ? 'Update Contact' : 'Save Contact';

  const headerLabel = !!id ? 'Edit Contact' : 'New Contact';

  const editSetter = () => {
    if (!id) return;
    setValue('bio', userDetail?.bio);
    setValue('born', userDetail?.born, shouldValidate);
    setValue('email', userDetail?.email || '');
    setValue('name', userDetail?.name || '');
    setValue('photo', userDetail?.photo, shouldValidate);
  };

  const handleConfirm = (date: Date) => {
    setValue('born', dateFormatter(date), shouldValidate);
    setIsDatePickerVisible(false);
  };

  const hideDatePicker = () => setIsDatePickerVisible(false);

  const onSubmit = (data: IContact) => {
    if (!!id)
      dispatch(
        dispatchContacts('UpdateContact', {
          ...data,
          id,
        }),
      );
    else
      dispatch(
        dispatchContacts('AddContact', {
          ...data,
          id: `${new Date().getTime()}`,
        }),
      );
    navigation.goBack();
  };

  const onDelteConfirm = () => {
    if (!id) return;
    navigation.pop(2);
    dispatch(dispatchContacts('DeleteContact', id));
  };

  const onPickPhoto = () =>
    launchImageLibrary({mediaType: 'photo'}, (image: ImagePickerResponse) => {
      if (image.didCancel) return;
      const {uri} = !!image?.assets ? image?.assets[0] : {uri: ''};
      setValue('photo', uri || '', shouldValidate);
    });

  const showDatePicker = () => setIsDatePickerVisible(true);

  return (
    <Canvas>
      <Header
        label={headerLabel}
        extraAction={!!id}
        actionPress={onDelteConfirm}
      />
      <KeyboardAvoidingView
        behavior={isIos ? 'height' : 'padding'}
        keyboardVerticalOffset={isIos ? 40 : 16}>
        <DummyFlatList usePadding>
          <Gap vertical={spaces.medium} />
          <ProfilePhoto onPress={onPickPhoto} uri={getValues('photo')} />
          <Gap vertical={spaces.xlarge} />
          <Controller
            control={control}
            rules={{
              required: {value: true, message: 'Please provide the name'},
            }}
            render={({field: {onChange, value}}) => (
              <PhraseInput
                autoCapitalize="words"
                label="Name"
                placeholder="What do we call it?"
                maxLength={40}
                onChangeText={onChange}
                value={value}
                error={!!errors.name?.message}
                errorMessage={errors.name?.message}
              />
            )}
            name="name"
          />
          <Gap vertical={spaces.semiLarge} />
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Please provide the email address',
              },
              validate: emailValidate,
            }}
            render={({field: {onChange, value}}) => (
              <PhraseInput
                label="Email"
                placeholder="Where to send the messages?"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={onChange}
                maxLength={50}
                value={value}
                error={!!errors.email?.message}
                errorMessage={errors.email?.message}
              />
            )}
            name="email"
          />
          <Gap vertical={spaces.semiLarge} />
          <PhraseInput
            label="Date of Birth"
            placeholder="What is the age?"
            passive
            passivePress={showDatePicker}
            value={getValues('born')}
          />
          <Gap vertical={spaces.semiLarge} />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <PhraseInput
                label="Bio"
                placeholder={`What's going on in their mind?`}
                multiline
                maxLength={500}
                onChangeText={onChange}
                value={value}
                error={!!errors.bio?.message}
                errorMessage={errors.bio?.message}
              />
            )}
            name="bio"
          />
          <Gap vertical={spaces.semiLarge} />
        </DummyFlatList>
      </KeyboardAvoidingView>
      <FluidButton
        onPress={handleSubmit(onSubmit)}
        style={styles.floatButton}
        disabled={!isValid}>
        {buttonLabel}
      </FluidButton>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
      />
    </Canvas>
  );
};

export default ContactForm;
