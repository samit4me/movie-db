import React from 'react';
import ReactDOM from 'react-dom';
import Movie, { computeRatingClassName } from './Movie';

describe('<Movie />', () => {
  describe('utils', () => {
    describe('computeRatingClassName()', () => {
      it('returns empty string if called without arguments', () => {
        const result = computeRatingClassName();
        const exected = '';
        expect(result).toEqual(exected);
      });
      it('returns empty string if called without invalid arguments', () => {
        const result = computeRatingClassName({ invalid: 'args' });
        const exected = '';
        expect(result).toEqual(exected);
      });
      it('returns className for high rating', () => {
        const result = computeRatingClassName(80);
        const exected = 'HighRating';
        expect(result).toEqual(exected);
      });
      it('returns className for average rating', () => {
        const result = computeRatingClassName(50);
        const exected = 'AverageRating';
        expect(result).toEqual(exected);
      });
      it('returns className for poor rating', () => {
        const result = computeRatingClassName(49.9);
        const exected = 'PoorRating';
        expect(result).toEqual(exected);
      });
    });
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Movie movie={{}} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
