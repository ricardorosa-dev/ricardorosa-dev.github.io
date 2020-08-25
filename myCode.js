function animalMap(options) {
  // seu código aqui
  const result = {};
  const animalsByLocation = {};
  const directions = ['NE', 'NW', 'SE', 'SW'];

  directions.forEach((direction) => {
    const myDirection = `animals${direction}`; // animalsByLocation[myDirection] = animalsNE
    animalsByLocation[myDirection] = animals.filter(animal => animal.location === direction);
    const animalNames = animalsByLocation[myDirection].map(animal => animal.name);

    if (!options) {
      result[direction] = animalsByLocation[myDirection].map(animal => animal.name);
      return result;
    } else if (options.includeNames) {
      let residents = animalsByLocation[myDirection].map(animal => animal.residents);
      if (options.sex) {
        residents = animalsByLocation[myDirection]
          .map(animal => animal.residents.filter(each => each.sex === options.sex)
            .map(resident => resident.name));
      } else {
        residents = animalsByLocation[myDirection]
          .map(animal => animal.residents.map(resident => resident.name));
      }

      result[direction] = [];
      for (let i = 0; i < animalNames.length; i += 1) {
        if (options.sorted === true) {
          residents[i].sort();
        }
        result[direction].push({ [animalNames[i]]: residents[i] });
      }
    } else {
      result[direction] = animalsByLocation[myDirection].map(animal => animal.name);
    }
    return result;
  });
  return result;
}
