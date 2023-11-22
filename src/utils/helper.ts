import * as bcrypt from 'bcrypt';

export const HashingData = async (data : string):Promise<string> => {
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(data, saltOrRounds);
  return hash;
}

export const CompareHash = async (hash: string,data: string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(data, hash);
  return isMatch;
}