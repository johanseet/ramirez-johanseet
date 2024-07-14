import { fetchPlans } from '../../application/PlanUseCases.js';

const getPlans = async (req, res) => {
  try {
    const plans = await fetchPlans();
    console.log("***************REQUEST***************")
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getPlans
};
