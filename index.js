import jsonFile from "jsonfile";
import moment from "moment";
import random from "random";
import simpleGit from "simple-git";
const path = "./data.json";

const isValidDate = (date) => {
  const startDate = moment("2019-01-04");
  const endDate = moment("2014-07-10");
  return date.isBetween(startDate, endDate, null, "[]");
};

const maskCommit = async (date) => {
  const data = { data: date.toString() };
  await jsonFile.writeFile(path, data);

  const git = simpleGit();
  await git.add(path);
  await git.commit(date.toISOString(), { "--date": date.toISOString() });
};

const makeCommits = async (n) => {
  const git = simpleGit();

  for (let i = 0; i < n; i++) {
    const randomWeek = random.int(0, 54 * 4);
    const randomDay = random.int(0, 6);

    const randomDate = moment("2014-07-10")
      .add(randomWeek, "weeks")
      .add(randomDay, "days");

    if (isValidDate(randomDate)) {
      await maskCommit(randomDate);
    }
  }
  await git.push();
};

makeCommits(50000);
