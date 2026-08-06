// Admin Controller Stub (Future MERN Implementation)
// Will handle approveDoctor, rejectDoctor, getStats, getAllUsers

exports.getStats = async (req, res) => {
  res.status(200).json({ success: true, message: 'Get admin statistics API endpoint stub' });
};

exports.approveDoctor = async (req, res) => {
  res.status(200).json({ success: true, message: 'Approve doctor API endpoint stub' });
};

exports.rejectDoctor = async (req, res) => {
  res.status(200).json({ success: true, message: 'Reject doctor API endpoint stub' });
};
