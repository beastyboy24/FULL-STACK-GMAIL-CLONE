
import { Box, Typography, Checkbox, styled, ListItem } from '@mui/material';
import { Star, StarBorder} from '@mui/icons-material';
import { useNavigate} from 'react-router-dom';
import { routes} from '../routes/routes';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';


const Wrapper = styled(Box)({
    padding: '0 0 0 10px',
    background: '#f2f6fc',
   
    cursor: 'pointer',
    '& > div': {
       display: 'flex',
       width: '100%',
    
       '& > p': {
          fontSize: 14
       }

    }
})

const Indicator = styled(Typography)({
    fontSize: '12px !important',
    background: '#ddd',
    color: '#222',
    padding: '0 4px',
    borderRadius: 4,
    marginRight: 6

})

const Date = styled(Typography)({
     marginLeft: 'auto',
     marginRight: 20,
     fontSize: 12,
     color: '#5F6368'
})

const Email = ({email, selectedEmails, setStarredEmail, setSelectedEmails }) => {

    const navigate = useNavigate();

    const toggleStarredEmailService = useApi(API_URLS.toggleStarredMails);

    const toggleStarredEmail = () => {
          toggleStarredEmailService.call({ id: email._id, value: !email.starred });
          setStarredEmail(prevState => !prevState);
         }
  
         const handleChange = () => {
            if(selectedEmails.includes(email._id)) {
                setSelectedEmails(prevState => prevState.filter(id => id !== email._id ));
            }
             else{
               setSelectedEmails(prevState => [...prevState, email._id]);
             }
         }

     return (
       <Wrapper>
          <Checkbox 
          size="small" 
          checked={selectedEmails.includes(email._id)}
          onChange={() => handleChange()}
          />
          {
             email.starred ?
              <Star fontSize="small" style={{ marginRight: 10, color: '#FFF200' }} onClick={() => toggleStarredEmail()} /> 
                :
                <StarBorder fontSize="small" style={{ marginRight: 10}} onClick={() => toggleStarredEmail()} /> 
            }
          
         <Box onClick ={() => navigate(routes.view.path, { state: { email: email}})}>
          
          
          <Typography style={{ width: 200 }}>To:{email.to.split('@')[0]}</Typography>
          <Indicator>Inbox</Indicator>
         
          <Typography>{email.subject} {email.body && '-'} {email.body}</Typography>
          <Date>
             {(new window.Date(email.date)).getDate()}&nbsp;
             {(new window.Date(email.date)).toLocaleString('default', { month: 'long' })}
          
          </Date>
          </Box>
       </Wrapper>
          
     )
}

export default Email;