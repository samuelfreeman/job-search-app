const prisma = require('../utils/prisma');
//  including  a location
const addLocation = async (data) => {
  const location = await prisma.location.create({
    data,
  });
  return location;
};
//  loading location
const loadLocations = async () => {
  const locations = await prisma.location.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });
  return locations;
};

// loading a single location
const loadLocation = async (id) => {
  const location = await prisma.location.findUnique({
    where: {
      id,
    },
  });
  return location;
};
// update a single location
const updateLocation = async (id, data) => {
  const location = await prisma.location.update({
    where: {
      id,
    },
    data,
  });
  return location;
};
// removing a location
const removeLocation = async (id) => {
  const location = await prisma.location.delete({
    where: {
      id,
    },
  });
  return location;
};
module.exports = {
  addLocation,
  loadLocations,
  loadLocation,
  updateLocation,
  removeLocation,
};
