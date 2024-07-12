import { fetchPlans as fetchPlansFromDB } from '../infrastructure/models/planModel.js';
import Plan from '../domain/Plan.js';

const fetchPlans = async () => {
  const plansData = await fetchPlansFromDB();
  return plansData.map(plan => new Plan(plan.id, plan.name, plan.cost, plan.max_ads_per_month, plan.features, plan.created_at));
};

export {
  fetchPlans
};
