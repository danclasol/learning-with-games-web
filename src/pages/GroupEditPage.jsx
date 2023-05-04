import { useParams } from 'react-router-dom';
import GroupEdit from '../components/group-edit/GroupEdit';
import Loading from '../components/shared/Loading';
import { useGroup } from '../lib/hooks/useGroup';

const GroupEditPage = () => {
	const { id } = useParams();

	const { group, loading, error, refresh } = useGroup({ id });

	if (loading) {
		return <Loading label='Loading...' />;
	}

	if (error) {
		return <p>Something went wrong. Please try again later.</p>;
	}

	return <GroupEdit group={group} refresh={refresh} />;
};

export default GroupEditPage;
