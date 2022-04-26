import { useUrlQueryParam } from '@/utils/url'

export const usePorjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [{ ...param, personId: Number(param.personId) || undefined }, setParam]
}
