import { fetchPlansFromDB, getPlanByPaypalIdFromDB } from '../infrastructure/models/planModel.js';
import Plan from '../domain/Plan.js';

const fetchPlans = async () => {
  const plansData = await fetchPlansFromDB();
  return plansData.map(plan => new Plan(plan.id, plan.name, plan.description, plan.paypal_plan_id, plan.cost, plan.max_ads_per_month, plan.features, plan.created_at));
};

const getPlanByPaypalId = async (paypalPlanId) => {
  const plan = await getPlanByPaypalIdFromDB(paypalPlanId);
  return new Plan(plan.id, plan.name, plan.description, plan.paypal_plan_id, plan.cost, plan.max_ads_per_month, plan.features, plan.created_at);
};

export {
  fetchPlans,
  getPlanByPaypalId
};
