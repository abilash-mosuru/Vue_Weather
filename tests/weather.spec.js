/* eslint-env jest */
/* We recommend installing an extension to run jest tests. */

import { getWeatherByCity } from '../src/services/weather.service'
import axios from 'axios'

jest.mock('axios')

afterEach(() => {
  jest.clearAllMocks()
})

test('Weather API returns city name', done => {
  axios.get.mockResolvedValue({
    data: {
      name: 'London'
    }
  })

  getWeatherByCity('London').subscribe(res => {
    expect(res.data.name).toBe('London')
    expect(axios.get).toHaveBeenCalled()
    done()
  })
})

test('getWeatherByCity calls axios.get once', done => {
  axios.get.mockResolvedValue({ data: {} })

  getWeatherByCity('Paris').subscribe(() => {
    expect(axios.get).toHaveBeenCalledTimes(1)
    done()
  })
})

test('handles API errors', done => {
  axios.get.mockRejectedValue(new Error('Network Error'))

  getWeatherByCity('Berlin').subscribe({
    next: () => done.fail('Expected an error'),
    error: err => {
      expect(err).toBeInstanceOf(Error)
      expect(err.message).toBe('Network Error')
      done()
    }
  })
})

test('emits undefined name when API returns no name', done => {
  axios.get.mockResolvedValue({ data: {} })

  getWeatherByCity('Unknown').subscribe(res => {
    expect(res.data.name).toBeUndefined()
    done()
  })
})