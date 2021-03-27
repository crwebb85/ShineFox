import { Counter } from './db/Counter'
import { Group } from './db/Group'

let counters: Counter[] = []
let groups: Group[] = []

export async function getCounter(idCounter: String): Promise<Counter> {
    let counter = counters.find(counter => counter.idCounter === idCounter) as Counter
    console.log(counter)
    return counter
}

export async function insertCounter(counter: Counter): Promise<Counter> {
    counters.push(counter)
    return counter
}

export async function updateCounter(counter: Counter): Promise<Counter> {
    let updateItem = counters.find(counter => counter.idCounter === counter.idCounter && counter.idGroup === counter.idGroup) as Counter;
    let index = counters.indexOf(updateItem);
    counters[index] = counter;
    return counter
}

export async function getAllCountersByIdGroup(idGroup: String): Promise<Counter[]> {
    let countersInGroup = counters.filter(counter => counter.idGroup === idGroup) as Counter[];
    return countersInGroup
}

export async function getGroup(idGroup: String): Promise<Group> {
    let group = groups.find(group => group.idGroup === idGroup) as Group;
    return group
}

export async function insertGroup(group: Group): Promise<Group> {
    groups.push(group)
    return group
}

export async function updateGroup(group: Group): Promise<Group> {
    let updateItem = groups.find(group1 => group.idGroup === group1.idGroup) as Group;
    let index = groups.indexOf(updateItem);
    groups[index] = group;
    return group
}
