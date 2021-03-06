import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';

import CompactReservationList from 'shared/compact-reservation-list';
import ReservationSuccessModal from './ReservationSuccessModal';

describe('shared/modals/reservation-success/ReservationSuccessModal', () => {
  const defaults = {
    createdReservations: [
      { id: 'r-1' },
    ],
    editedReservation: null,
    failedReservations: [],
    onHide: () => null,
    resourceNames: {},
    show: true,
  };

  function getWrapper(props) {
    return shallow(<ReservationSuccessModal {...defaults} {...props} />);
  }

  it('renders a Modal with correct props', () => {
    const modal = getWrapper().find(Modal);
    expect(modal).to.have.length(1);
    expect(modal.prop('className')).to.equal('reservation-success-modal');
    expect(modal.prop('onHide')).to.equal(defaults.onHide);
    expect(modal.prop('show')).to.equal(defaults.show);
  });

  it('renders correct mainTitle', () => {
    const mainTitle = getWrapper().find('.reservation-success-modal-main-title');
    expect(mainTitle).to.have.length(1);
    expect(mainTitle.text()).to.equal('Varauksesi on kirjattu');
  });

  it('renders correct listTitle', () => {
    const listTitle = getWrapper().find('.reservation-success-modal-list-title');
    expect(listTitle).to.have.length(1);
    expect(listTitle.text()).to.equal('Sinulle on tehty 1 tilavaraus');
  });

  it('renders correct listTitle when many reservations', () => {
    const props = {
      createdReservations: [
        { id: 'r-1' },
        { id: 'r-2' },
      ],
    };
    const listTitle = getWrapper(props).find('.reservation-success-modal-list-title');
    expect(listTitle).to.have.length(1);
    expect(listTitle.text()).to.equal('Sinulle on tehty 2 tilavarausta');
  });

  it('renders list of created reservations', () => {
    const list = getWrapper().find('.reservations-list');
    expect(list.is(CompactReservationList)).to.be.true;
    expect(list.prop('reservations')).to.deep.equal(defaults.createdReservations);
    expect(list.prop('resourceNames')).to.deep.equal(defaults.resourceNames);
    expect(list.prop('success')).to.be.true;
  });

  it('renders list of failed reservations', () => {
    const failedReservations = [
      { id: 'r-2' },
      { id: 'r-3' },
    ];
    const props = { failedReservations };
    const list = getWrapper(props).find('.failed-reservations-list');
    expect(list.is(CompactReservationList)).to.be.true;
    expect(list.prop('reservations')).to.deep.equal(failedReservations);
    expect(list.prop('resourceNames')).to.deep.equal(defaults.resourceNames);
    expect(list.prop('failure')).to.be.true;
  });

  describe('catering order item', () => {
    const baseClass = 'reservation-success-modal-catering-order';
    const successClass = 'reservation-success-modal-catering-order-success';
    const errorClass = 'reservation-success-modal-catering-order-error';

    function getItemWrapper(cateringOrderResult) {
      return getWrapper({ cateringOrderResult }).find(`.${baseClass}`);
    }

    it('is not rendered when no cateringOrderResult prop', () => {
      const item = getItemWrapper(null);
      expect(item).to.have.length(0);
    });

    it('renders correct text on POST-success', () => {
      const item = getItemWrapper('POST-success');
      expect(item).to.have.length(1);
      expect(item.text()).to.equal(
        'Tilaisuuden tarjoilutilaus on lähetetty palveluntarjoajalle.'
      );
    });

    it('renders correct text on POST-error', () => {
      const item = getItemWrapper('POST-error');
      expect(item).to.have.length(1);
      expect(item.text()).to.equal(
        'Tilaisuuden tarjoilutilauksen tekeminen epäonnistui.'
      );
    });

    it('renders correct text on PUT-success', () => {
      const item = getItemWrapper('PUT-success');
      expect(item).to.have.length(1);
      expect(item.text()).to.equal(
        'Tilaisuuden muokattu tarjoilutilaus on lähetetty palveluntarjoajalle.'
      );
    });

    it('renders correct text on PUT-error', () => {
      const item = getItemWrapper('PUT-error');
      expect(item).to.have.length(1);
      expect(item.text()).to.equal(
        'Tilaisuuden tarjoilutilauksen muokkaus epäonnistui.'
      );
    });

    it('renders correct text on DELETE-success', () => {
      const item = getItemWrapper('DELETE-success');
      expect(item).to.have.length(1);
      expect(item.text()).to.equal(
        'Tilaisuuden tarjoilutilaus on poistettu.'
      );
    });

    it('renders correct text on DELETE-error', () => {
      const item = getItemWrapper('DELETE-error');
      expect(item).to.have.length(1);
      expect(item.text()).to.equal(
        'Tilaisuuden tarjoilutilauksen poistaminen epäonnistui.'
      );
    });

    it('has success class on success', () => {
      const item = getItemWrapper('DELETE-success');
      expect(item.hasClass(successClass)).to.be.true;
      expect(item.hasClass(errorClass)).to.be.false;
    });

    it('has error class on error', () => {
      const item = getItemWrapper('PUT-error');
      expect(item.hasClass(errorClass)).to.be.true;
      expect(item.hasClass(successClass)).to.be.false;
    });
  });

  describe('when edited', () => {
    function getEditedWrapper() {
      return getWrapper({
        createdReservations: [],
        editedReservation: { id: 'r-1' },
      });
    }

    it('renders correct mainTitle', () => {
      const mainTitle = getEditedWrapper().find('.reservation-success-modal-main-title');
      expect(mainTitle).to.have.length(1);
      expect(mainTitle.text()).to.equal('Varauksen muokkaus onnistui');
    });

    it('renders correct listTitle', () => {
      const listTitle = getEditedWrapper().find('.reservation-success-modal-list-title');
      expect(listTitle).to.have.length(1);
      expect(listTitle.text()).to.equal('Yhtä tilavarausta on muokattu');
    });
  });
});
