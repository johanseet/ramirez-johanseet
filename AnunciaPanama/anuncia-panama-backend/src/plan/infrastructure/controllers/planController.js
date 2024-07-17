import { fetchPlans, getPlanByPaypalId } from '../../application/PlanUseCases.js';

const getPlans = async (req, res) => {
  try {
    const plans = await fetchPlans();
    res.status(200).json(plans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({ error: error.message });
  }
};

const getPlanByPayPalId = async (req, res) => {
  try {
    const { paypalId } = req.params;
    const plan = await getPlanByPaypalId(paypalId);
    if (!plan) {
      return res.status(404).json({ error: 'El plan no se encuentra' });
    }
    res.status(200).json(plan);
  } catch (error) {
    console.error('Error obteniendo el plan:', error);
    res.status(500).json({ error: error.message });
  }
};


export {
  getPlans,
  getPlanByPayPalId
};
