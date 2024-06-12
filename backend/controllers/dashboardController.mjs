import Dashboard from '../models/Dashboard.mjs';

export const getDashboards = async (req, res) => {
  try {
    const dashboards = await Dashboard.find({ userId: req.session.user.id });
    res.json(dashboards);
  } catch (error) {
    console.error('Error fetching dashboards:', error);
    res.status(500).json({ message: error.message });
  }
};

export const addDashboard = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const newDashboard = new Dashboard({
      userId: req.session.user.id,
      title,
      boards: [],
    });

    const savedDashboard = await newDashboard.save();
    res.status(201).json(savedDashboard);
  } catch (error) {
    console.error('Error adding dashboard:', error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteDashboard = async (req, res) => {
  const { id } = req.params;

  try {
    const dashboard = await Dashboard.findById(id);
    if (!dashboard) {
      return res.status(404).json({ error: 'Dashboard not found' });
    }

    if (dashboard.userId.toString() !== req.session.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Dashboard.findByIdAndDelete(id);
    res.json({ message: 'Dashboard deleted' });
  } catch (error) {
    console.error('Error deleting dashboard:', error);
    res.status(500).json({ message: 'Failed to delete dashboard' });
  }
};

export const addBoardToDashboard = async (req, res) => {
  const { id } = req.params;
  const { type } = req.body;

  if (!type || type.trim() === '') {
    return res.status(400).json({ error: 'Type is required' });
  }

  try {
    const dashboard = await Dashboard.findById(id);
    if (!dashboard) {
      return res.status(404).json({ error: 'Dashboard not found' });
    }

    if (dashboard.userId.toString() !== req.session.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    dashboard.boards.push({ type });
    await dashboard.save();
    res.json(dashboard);
  } catch (error) {
    console.error('Error adding board to dashboard:', error);
    res.status(500).json({ message: 'Failed to add board to dashboard' });
  }
};

export const removeBoardFromDashboard = async (req, res) => {
  const { id } = req.params;
  const { index } = req.body;

  try {
    const dashboard = await Dashboard.findById(id);
    if (!dashboard) {
      return res.status(404).json({ error: 'Dashboard not found' });
    }

    if (dashboard.userId.toString() !== req.session.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    if (index >= 0 && index < dashboard.boards.length) {
      dashboard.boards.splice(index, 1);
      await dashboard.save();
      res.json(dashboard);
    } else {
      res.status(400).json({ error: 'Invalid index' });
    }
  } catch (error) {
    console.error('Error removing board from dashboard:', error);
    res.status(500).json({ message: 'Failed to remove board from dashboard' });
  }
};

export const updateBoardType = async (req, res) => {
  const { id } = req.params;
  const { index, type } = req.body;

  try {
    const dashboard = await Dashboard.findById(id);
    if (!dashboard) {
      return res.status(404).json({ error: 'Dashboard not found' });
    }

    if (dashboard.userId.toString() !== req.session.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    if (index >= 0 && index < dashboard.boards.length) {
      dashboard.boards[index].type = type;
      await dashboard.save();
      res.json(dashboard);
    } else {
      res.status(400).json({ error: 'Invalid index' });
    }
  } catch (error) {
    console.error('Error updating board type:', error);
    res.status(500).json({ message: 'Failed to update board type' });
  }
};
